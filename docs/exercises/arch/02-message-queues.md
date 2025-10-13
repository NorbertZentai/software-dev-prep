---
title: "Message Queues és Event-Driven Architecture"
difficulty: advanced
goals: 
  - "RabbitMQ/Apache Kafka"
  - "Event Sourcing"
  - "CQRS pattern"
  - "Saga Pattern"
  - "Dead Letter Queues"
estimatedMinutes: 60
starter:
  stackblitz: "https://stackblitz.com/edit/event-driven-microservices?file=README.md"
  codesandbox: "https://codesandbox.io/s/message-queues-demo"
  dbfiddle: ""
---

# Message Queues és Event-Driven Architecture

## Feladat leírása

Tervezz és implementálj egy komplex event-driven mikroszolgáltatás architektúrát message queues használatával. A rendszer kezelje az aszinkron kommunikációt, event sourcing-ot, CQRS pattern-t és distributed saga transaction-öket.

## Event-Driven Architecture áttekintés

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Client    │    │   Mobile App    │    │   Admin Panel   │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          │ WebSocket            │ WebSocket            │ HTTP/REST
          ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    API Gateway                                  │
└─────────┬───────────────────┬───────────────────┬───────────────┘
          │                   │                   │
          ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  Command API    │ │   Query API     │ │  Admin API      │
│   (Write)       │ │   (Read)        │ │   (Management)  │
└─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
          │                   │                   │
          │ Events            │ Events            │ Events
          ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Event Bus                                    │
│              (Apache Kafka / RabbitMQ)                        │
└─────────┬────┬────┬────┬────┬────┬────┬────┬────┬───────────────┘
          │    │    │    │    │    │    │    │    │
          ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼    ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │  User Service   │ │ Order Service   │ │Payment Service  │
    │ (Event Sourced) │ │ (Event Sourced) │ │ (Event Sourced) │
    └─────────┬───────┘ └─────────┬───────┘ └─────────┬───────┘
              │                   │                   │
              ▼                   ▼                   ▼
    ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
    │   User Read     │ │  Order Read     │ │ Payment Read    │
    │    Model        │ │    Model        │ │    Model        │
    └─────────────────┘ └─────────────────┘ └─────────────────┘
```

## Feladat 1: Kafka Event Bus Implementation

### Kafka Configuration

```java
@Configuration
@EnableKafka
@RequiredArgsConstructor
public class KafkaConfiguration {

    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ProducerFactory<String, Object> producerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, JsonSerializer.class);

        // Producer optimization
        props.put(ProducerConfig.ACKS_CONFIG, "all");
        props.put(ProducerConfig.RETRIES_CONFIG, 3);
        props.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);
        props.put(ProducerConfig.LINGER_MS_CONFIG, 5);
        props.put(ProducerConfig.BUFFER_MEMORY_CONFIG, 33554432);

        // Idempotency
        props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
        props.put(ProducerConfig.MAX_IN_FLIGHT_REQUESTS_PER_CONNECTION, 5);

        // Compression
        props.put(ProducerConfig.COMPRESSION_TYPE_CONFIG, "snappy");

        return new DefaultKafkaProducerFactory<>(props);
    }

    @Bean
    public KafkaTemplate<String, Object> kafkaTemplate() {
        KafkaTemplate<String, Object> template = new KafkaTemplate<>(producerFactory());
        template.setDefaultTopic("default-events");
        return template;
    }

    @Bean
    public ConsumerFactory<String, Object> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        props.put(ConsumerConfig.GROUP_ID_CONFIG, "microservice-group");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, JsonDeserializer.class);

        // Consumer optimization
        props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);
        props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);
        props.put(ConsumerConfig.FETCH_MIN_BYTES_CONFIG, 1024);
        props.put(ConsumerConfig.FETCH_MAX_WAIT_MS_CONFIG, 500);

        // Deserializer configuration
        props.put(JsonDeserializer.TRUSTED_PACKAGES, "com.company.events");
        props.put(JsonDeserializer.USE_TYPE_INFO_HEADERS, false);
        props.put(JsonDeserializer.VALUE_DEFAULT_TYPE, DomainEvent.class.getName());

        return new DefaultKafkaConsumerFactory<>(props);
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, Object> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, Object> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());

        // Error handling
        factory.setErrorHandler(new SeekToCurrentErrorHandler(
                new FixedBackOff(1000L, 3),
                new DeadLetterPublishingRecoverer(kafkaTemplate())));

        // Concurrency
        factory.setConcurrency(3);
        factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL_IMMEDIATE);

        return factory;
    }

    @Bean
    public NewTopic userEventsTopic() {
        return TopicBuilder.name("user-events")
                .partitions(3)
                .replicas(2)
                .config(TopicConfig.RETENTION_MS_CONFIG, "604800000") // 7 days
                .config(TopicConfig.CLEANUP_POLICY_CONFIG, TopicConfig.CLEANUP_POLICY_COMPACT)
                .build();
    }

    @Bean
    public NewTopic orderEventsTopic() {
        return TopicBuilder.name("order-events")
                .partitions(5)
                .replicas(2)
                .config(TopicConfig.RETENTION_MS_CONFIG, "2592000000") // 30 days
                .build();
    }

    @Bean
    public NewTopic deadLetterTopic() {
        return TopicBuilder.name("dead-letter-queue")
                .partitions(1)
                .replicas(2)
                .config(TopicConfig.RETENTION_MS_CONFIG, "86400000") // 1 day
                .build();
    }
}
```

### Domain Events

```java
// Base Event
@JsonTypeInfo(use = JsonTypeInfo.Id.NAME, property = "eventType")
@JsonSubTypes({
    @JsonSubTypes.Type(value = UserCreatedEvent.class, name = "UserCreated"),
    @JsonSubTypes.Type(value = UserUpdatedEvent.class, name = "UserUpdated"),
    @JsonSubTypes.Type(value = OrderCreatedEvent.class, name = "OrderCreated"),
    @JsonSubTypes.Type(value = OrderConfirmedEvent.class, name = "OrderConfirmed"),
    @JsonSubTypes.Type(value = PaymentProcessedEvent.class, name = "PaymentProcessed")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class DomainEvent {

    private String eventId = UUID.randomUUID().toString();
    private String aggregateId;
    private String aggregateType;
    private Long version;
    private Instant timestamp = Instant.now();
    private String causationId;
    private String correlationId;
    private Map<String, Object> metadata = new HashMap<>();

    public abstract String getEventType();

    public void addMetadata(String key, Object value) {
        this.metadata.put(key, value);
    }
}

// User Events
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class UserCreatedEvent extends DomainEvent {

    private String userId;
    private String email;
    private String name;
    private UserStatus status;
    private Instant createdAt;

    public UserCreatedEvent(String userId, String email, String name) {
        super();
        this.userId = userId;
        this.email = email;
        this.name = name;
        this.status = UserStatus.ACTIVE;
        this.createdAt = Instant.now();

        setAggregateId(userId);
        setAggregateType("User");
        setVersion(1L);
    }

    @Override
    public String getEventType() {
        return "UserCreated";
    }
}

@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class OrderCreatedEvent extends DomainEvent {

    private String orderId;
    private String userId;
    private List<OrderItem> items;
    private BigDecimal totalAmount;
    private String currency;
    private OrderStatus status;
    private Instant createdAt;

    @Override
    public String getEventType() {
        return "OrderCreated";
    }
}

// Saga Events
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class OrderProcessingSagaStartedEvent extends DomainEvent {

    private String sagaId;
    private String orderId;
    private String userId;
    private BigDecimal amount;
    private List<String> steps;

    @Override
    public String getEventType() {
        return "OrderProcessingSagaStarted";
    }
}
```

### Event Publisher

```java
@Component
@Slf4j
@RequiredArgsConstructor
public class EventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final MeterRegistry meterRegistry;
    private final OutboxEventRepository outboxRepository;

    @Async
    public CompletableFuture<SendResult<String, Object>> publishEvent(DomainEvent event) {
        return publishEvent(event, null);
    }

    @Async
    public CompletableFuture<SendResult<String, Object>> publishEvent(DomainEvent event, String topic) {
        try {
            // Set correlation and causation IDs
            setTraceContext(event);

            // Determine topic
            String targetTopic = topic != null ? topic : getTopicForEvent(event);

            // Create producer record with headers
            ProducerRecord<String, Object> record = createProducerRecord(targetTopic, event);

            // Publish to Kafka
            CompletableFuture<SendResult<String, Object>> future = kafkaTemplate.send(record);

            // Add success/error callbacks
            future.thenAccept(result -> {
                log.info("Event published successfully: {} to topic: {} at offset: {}",
                        event.getEventType(), targetTopic, result.getRecordMetadata().offset());

                meterRegistry.counter("events.published.success",
                        Tags.of(
                                Tag.of("event_type", event.getEventType()),
                                Tag.of("topic", targetTopic)
                        )).increment();
            });

            future.exceptionally(ex -> {
                log.error("Failed to publish event: {} to topic: {}",
                        event.getEventType(), targetTopic, ex);

                meterRegistry.counter("events.published.error",
                        Tags.of(
                                Tag.of("event_type", event.getEventType()),
                                Tag.of("topic", targetTopic)
                        )).increment();

                // Store in outbox for retry
                storeInOutbox(event, targetTopic);
                return null;
            });

            return future;

        } catch (Exception e) {
            log.error("Error publishing event: {}", event.getEventType(), e);
            throw new EventPublishingException("Failed to publish event", e);
        }
    }

    private void setTraceContext(DomainEvent event) {
        // Set correlation ID from MDC or generate new
        String correlationId = MDC.get("correlationId");
        if (correlationId == null) {
            correlationId = UUID.randomUUID().toString();
        }
        event.setCorrelationId(correlationId);

        // Set causation ID
        String causationId = MDC.get("causationId");
        event.setCausationId(causationId);

        // Add trace metadata
        event.addMetadata("service", "user-service");
        event.addMetadata("version", "1.0.0");
        event.addMetadata("environment", System.getProperty("spring.profiles.active", "local"));
    }

    private String getTopicForEvent(DomainEvent event) {
        switch (event.getAggregateType().toLowerCase()) {
            case "user":
                return "user-events";
            case "order":
                return "order-events";
            case "payment":
                return "payment-events";
            case "saga":
                return "saga-events";
            default:
                return "default-events";
        }
    }

    private ProducerRecord<String, Object> createProducerRecord(String topic, DomainEvent event) {
        // Use aggregate ID as partition key for ordering
        String key = event.getAggregateId();

        // Create headers
        Headers headers = new RecordHeaders();
        headers.add("eventType", event.getEventType().getBytes(StandardCharsets.UTF_8));
        headers.add("eventId", event.getEventId().getBytes(StandardCharsets.UTF_8));
        headers.add("correlationId",
                event.getCorrelationId() != null ?
                        event.getCorrelationId().getBytes(StandardCharsets.UTF_8) : new byte[0]);
        headers.add("timestamp", event.getTimestamp().toString().getBytes(StandardCharsets.UTF_8));

        return new ProducerRecord<>(topic, null, key, event, headers);
    }

    private void storeInOutbox(DomainEvent event, String topic) {
        try {
            OutboxEvent outboxEvent = OutboxEvent.builder()
                    .eventId(event.getEventId())
                    .eventType(event.getEventType())
                    .aggregateId(event.getAggregateId())
                    .eventData(objectMapper.writeValueAsString(event))
                    .topic(topic)
                    .status(OutboxStatus.PENDING)
                    .createdAt(Instant.now())
                    .build();

            outboxRepository.save(outboxEvent);
            log.info("Event stored in outbox for retry: {}", event.getEventId());

        } catch (Exception e) {
            log.error("Failed to store event in outbox: {}", event.getEventId(), e);
        }
    }
}
```

## Feladat 2: Event Sourcing Implementation

### Event Store

```java
@Entity
@Table(name = "event_store")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventStoreEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_id", unique = true, nullable = false)
    private String eventId;

    @Column(name = "aggregate_id", nullable = false)
    private String aggregateId;

    @Column(name = "aggregate_type", nullable = false)
    private String aggregateType;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "event_data", columnDefinition = "TEXT", nullable = false)
    private String eventData;

    @Column(name = "version", nullable = false)
    private Long version;

    @Column(name = "timestamp", nullable = false)
    private Instant timestamp;

    @Column(name = "correlation_id")
    private String correlationId;

    @Column(name = "causation_id")
    private String causationId;

    @Column(name = "metadata", columnDefinition = "TEXT")
    private String metadata;

    @CreationTimestamp
    @Column(name = "created_at")
    private Instant createdAt;
}

@Repository
public interface EventStoreRepository extends JpaRepository<EventStoreEntry, Long> {

    List<EventStoreEntry> findByAggregateIdOrderByVersionAsc(String aggregateId);

    List<EventStoreEntry> findByAggregateIdAndVersionGreaterThanOrderByVersionAsc(
            String aggregateId, Long version);

    List<EventStoreEntry> findByAggregateTypeOrderByTimestampAsc(String aggregateType);

    List<EventStoreEntry> findByCorrelationIdOrderByTimestampAsc(String correlationId);

    @Query("SELECT e FROM EventStoreEntry e WHERE e.timestamp >= :from AND e.timestamp <= :to ORDER BY e.timestamp ASC")
    List<EventStoreEntry> findEventsBetween(
            @Param("from") Instant from,
            @Param("to") Instant to);

    @Query("SELECT e FROM EventStoreEntry e WHERE e.aggregateId = :aggregateId AND e.version = (SELECT MAX(e2.version) FROM EventStoreEntry e2 WHERE e2.aggregateId = :aggregateId)")
    Optional<EventStoreEntry> findLatestEventForAggregate(@Param("aggregateId") String aggregateId);
}
```

### Event Store Service

```java
@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class EventStoreService {

    private final EventStoreRepository eventStoreRepository;
    private final ObjectMapper objectMapper;
    private final ApplicationEventPublisher applicationEventPublisher;
    private final MeterRegistry meterRegistry;

    public void saveEvent(DomainEvent event) {
        try {
            EventStoreEntry entry = EventStoreEntry.builder()
                    .eventId(event.getEventId())
                    .aggregateId(event.getAggregateId())
                    .aggregateType(event.getAggregateType())
                    .eventType(event.getEventType())
                    .eventData(objectMapper.writeValueAsString(event))
                    .version(event.getVersion())
                    .timestamp(event.getTimestamp())
                    .correlationId(event.getCorrelationId())
                    .causationId(event.getCausationId())
                    .metadata(objectMapper.writeValueAsString(event.getMetadata()))
                    .build();

            eventStoreRepository.save(entry);

            // Publish event for external consumption
            applicationEventPublisher.publishEvent(event);

            meterRegistry.counter("eventstore.events.saved",
                    Tags.of(
                            Tag.of("aggregate_type", event.getAggregateType()),
                            Tag.of("event_type", event.getEventType())
                    )).increment();

            log.debug("Event saved to event store: {} for aggregate: {}",
                    event.getEventType(), event.getAggregateId());

        } catch (Exception e) {
            log.error("Failed to save event to event store: {}", event.getEventId(), e);
            throw new EventStoreException("Failed to save event", e);
        }
    }

    public List<DomainEvent> getEventsForAggregate(String aggregateId) {
        List<EventStoreEntry> entries = eventStoreRepository
                .findByAggregateIdOrderByVersionAsc(aggregateId);

        return entries.stream()
                .map(this::deserializeEvent)
                .collect(Collectors.toList());
    }

    public List<DomainEvent> getEventsForAggregateFromVersion(String aggregateId, Long version) {
        List<EventStoreEntry> entries = eventStoreRepository
                .findByAggregateIdAndVersionGreaterThanOrderByVersionAsc(aggregateId, version);

        return entries.stream()
                .map(this::deserializeEvent)
                .collect(Collectors.toList());
    }

    public Optional<Long> getLatestVersionForAggregate(String aggregateId) {
        return eventStoreRepository.findLatestEventForAggregate(aggregateId)
                .map(EventStoreEntry::getVersion);
    }

    public List<DomainEvent> getAllEventsOfType(String eventType) {
        List<EventStoreEntry> entries = eventStoreRepository
                .findByAggregateTypeOrderByTimestampAsc(eventType);

        return entries.stream()
                .map(this::deserializeEvent)
                .collect(Collectors.toList());
    }

    public List<DomainEvent> getEventsBetween(Instant from, Instant to) {
        List<EventStoreEntry> entries = eventStoreRepository
                .findEventsBetween(from, to);

        return entries.stream()
                .map(this::deserializeEvent)
                .collect(Collectors.toList());
    }

    private DomainEvent deserializeEvent(EventStoreEntry entry) {
        try {
            return objectMapper.readValue(entry.getEventData(), DomainEvent.class);
        } catch (Exception e) {
            log.error("Failed to deserialize event: {}", entry.getEventId(), e);
            throw new EventDeserializationException("Failed to deserialize event", e);
        }
    }

    // Event replay functionality
    public void replayEvents(String aggregateId, EventReplayCallback callback) {
        List<DomainEvent> events = getEventsForAggregate(aggregateId);

        for (DomainEvent event : events) {
            try {
                callback.onEvent(event);
            } catch (Exception e) {
                log.error("Error during event replay for aggregate {}: {}", aggregateId, e.getMessage());
                throw new EventReplayException("Event replay failed", e);
            }
        }
    }

    @FunctionalInterface
    public interface EventReplayCallback {
        void onEvent(DomainEvent event) throws Exception;
    }
}
```

### Aggregate Root with Event Sourcing

```java
@MappedSuperclass
public abstract class EventSourcedAggregateRoot {

    @Id
    private String id;

    @Version
    private Long version = 0L;

    @Transient
    private List<DomainEvent> uncommittedEvents = new ArrayList<>();

    @Transient
    private boolean isReplaying = false;

    protected EventSourcedAggregateRoot() {
    }

    protected EventSourcedAggregateRoot(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public Long getVersion() {
        return version;
    }

    public List<DomainEvent> getUncommittedEvents() {
        return new ArrayList<>(uncommittedEvents);
    }

    public void markEventsAsCommitted() {
        uncommittedEvents.clear();
    }

    protected void applyEvent(DomainEvent event) {
        if (!isReplaying) {
            event.setAggregateId(this.id);
            event.setAggregateType(this.getClass().getSimpleName());
            event.setVersion(this.version + 1);
            uncommittedEvents.add(event);
        }

        mutate(event);
        this.version = event.getVersion();
    }

    protected abstract void mutate(DomainEvent event);

    public void replayEvents(List<DomainEvent> events) {
        isReplaying = true;
        try {
            for (DomainEvent event : events) {
                mutate(event);
                this.version = event.getVersion();
            }
        } finally {
            isReplaying = false;
        }
    }
}

// User Aggregate
@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class User extends EventSourcedAggregateRoot {

    private String email;
    private String name;
    private UserStatus status;
    private Instant createdAt;
    private Instant updatedAt;

    // Commands
    public static User createUser(String userId, String email, String name) {
        User user = new User();
        user.applyEvent(new UserCreatedEvent(userId, email, name));
        return user;
    }

    public void updateProfile(String newName, String newEmail) {
        if (this.status != UserStatus.ACTIVE) {
            throw new UserNotActiveException("Cannot update inactive user");
        }

        UserUpdatedEvent event = new UserUpdatedEvent();
        event.setUserId(this.getId());
        event.setOldName(this.name);
        event.setNewName(newName);
        event.setOldEmail(this.email);
        event.setNewEmail(newEmail);
        event.setUpdatedAt(Instant.now());

        applyEvent(event);
    }

    public void deactivate(String reason) {
        if (this.status == UserStatus.INACTIVE) {
            throw new UserAlreadyInactiveException("User is already inactive");
        }

        UserDeactivatedEvent event = new UserDeactivatedEvent();
        event.setUserId(this.getId());
        event.setReason(reason);
        event.setDeactivatedAt(Instant.now());

        applyEvent(event);
    }

    @Override
    protected void mutate(DomainEvent event) {
        switch (event.getEventType()) {
            case "UserCreated":
                mutate((UserCreatedEvent) event);
                break;
            case "UserUpdated":
                mutate((UserUpdatedEvent) event);
                break;
            case "UserDeactivated":
                mutate((UserDeactivatedEvent) event);
                break;
            default:
                throw new UnsupportedEventTypeException("Unsupported event type: " + event.getEventType());
        }
    }

    private void mutate(UserCreatedEvent event) {
        this.email = event.getEmail();
        this.name = event.getName();
        this.status = event.getStatus();
        this.createdAt = event.getCreatedAt();
        this.updatedAt = event.getCreatedAt();
    }

    private void mutate(UserUpdatedEvent event) {
        this.name = event.getNewName();
        this.email = event.getNewEmail();
        this.updatedAt = event.getUpdatedAt();
    }

    private void mutate(UserDeactivatedEvent event) {
        this.status = UserStatus.INACTIVE;
        this.updatedAt = event.getDeactivatedAt();
    }
}
```

## Feladat 3: CQRS Pattern Implementation

### Command Side

```java
// Command Handlers
@Component
@Transactional
@Slf4j
@RequiredArgsConstructor
public class UserCommandHandler {

    private final EventStoreService eventStoreService;
    private final EventPublisher eventPublisher;

    @CommandHandler
    public void handle(CreateUserCommand command) {
        // Validate command
        validateCreateUserCommand(command);

        // Check if user already exists (basic validation)
        if (userExists(command.getUserId())) {
            throw new UserAlreadyExistsException("User already exists: " + command.getUserId());
        }

        // Create aggregate
        User user = User.createUser(command.getUserId(), command.getEmail(), command.getName());

        // Save events
        for (DomainEvent event : user.getUncommittedEvents()) {
            eventStoreService.saveEvent(event);
            eventPublisher.publishEvent(event);
        }

        user.markEventsAsCommitted();

        log.info("User created successfully: {}", command.getUserId());
    }

    @CommandHandler
    public void handle(UpdateUserCommand command) {
        // Load aggregate from event store
        User user = loadUserFromEventStore(command.getUserId());

        // Execute command
        user.updateProfile(command.getName(), command.getEmail());

        // Save new events
        for (DomainEvent event : user.getUncommittedEvents()) {
            eventStoreService.saveEvent(event);
            eventPublisher.publishEvent(event);
        }

        user.markEventsAsCommitted();

        log.info("User updated successfully: {}", command.getUserId());
    }

    private User loadUserFromEventStore(String userId) {
        List<DomainEvent> events = eventStoreService.getEventsForAggregate(userId);

        if (events.isEmpty()) {
            throw new UserNotFoundException("User not found: " + userId);
        }

        User user = new User();
        user.replayEvents(events);

        return user;
    }

    private void validateCreateUserCommand(CreateUserCommand command) {
        if (StringUtils.isBlank(command.getEmail())) {
            throw new InvalidCommandException("Email is required");
        }
        if (StringUtils.isBlank(command.getName())) {
            throw new InvalidCommandException("Name is required");
        }
        if (!EmailValidator.getInstance().isValid(command.getEmail())) {
            throw new InvalidCommandException("Invalid email format");
        }
    }

    private boolean userExists(String userId) {
        return eventStoreService.getLatestVersionForAggregate(userId).isPresent();
    }
}

// Commands
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateUserCommand {
    private String userId = UUID.randomUUID().toString();
    private String email;
    private String name;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserCommand {
    private String userId;
    private String email;
    private String name;
}
```

### Query Side (Read Models)

```java
// Read Model
@Entity
@Table(name = "user_read_model")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserReadModel {

    @Id
    private String id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    private Instant createdAt;
    private Instant updatedAt;
    private Long version;

    // Derived fields for queries
    private String searchableText; // name + email for full-text search
    private Integer orderCount;
    private BigDecimal totalOrderValue;
    private Instant lastOrderDate;
}

@Repository
public interface UserReadModelRepository extends JpaRepository<UserReadModel, String> {

    List<UserReadModel> findByStatus(UserStatus status);

    List<UserReadModel> findByEmailContainingIgnoreCase(String email);

    List<UserReadModel> findByNameContainingIgnoreCase(String name);

    @Query("SELECT u FROM UserReadModel u WHERE u.searchableText LIKE %:searchTerm%")
    List<UserReadModel> findBySearchTerm(@Param("searchTerm") String searchTerm);

    Page<UserReadModel> findByStatusOrderByCreatedAtDesc(UserStatus status, Pageable pageable);

    @Query("SELECT u FROM UserReadModel u WHERE u.totalOrderValue >= :minValue ORDER BY u.totalOrderValue DESC")
    List<UserReadModel> findHighValueCustomers(@Param("minValue") BigDecimal minValue);

    @Query("SELECT COUNT(u), u.status FROM UserReadModel u GROUP BY u.status")
    List<Object[]> getUserStatusStatistics();
}

// Event Handlers for Read Model Updates
@Component
@Slf4j
@RequiredArgsConstructor
public class UserReadModelUpdater {

    private final UserReadModelRepository userReadModelRepository;

    @KafkaListener(topics = "user-events", groupId = "user-read-model-group")
    public void handle(UserCreatedEvent event, Acknowledgment ack) {
        try {
            UserReadModel readModel = UserReadModel.builder()
                    .id(event.getUserId())
                    .email(event.getEmail())
                    .name(event.getName())
                    .status(event.getStatus())
                    .createdAt(event.getCreatedAt())
                    .updatedAt(event.getCreatedAt())
                    .version(event.getVersion())
                    .searchableText(event.getName() + " " + event.getEmail())
                    .orderCount(0)
                    .totalOrderValue(BigDecimal.ZERO)
                    .build();

            userReadModelRepository.save(readModel);

            log.info("User read model created: {}", event.getUserId());
            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to handle UserCreatedEvent: {}", event.getUserId(), e);
            throw e; // Let error handler deal with it
        }
    }

    @KafkaListener(topics = "user-events", groupId = "user-read-model-group")
    public void handle(UserUpdatedEvent event, Acknowledgment ack) {
        try {
            UserReadModel readModel = userReadModelRepository.findById(event.getUserId())
                    .orElseThrow(() -> new ReadModelNotFoundException("User read model not found: " + event.getUserId()));

            readModel.setName(event.getNewName());
            readModel.setEmail(event.getNewEmail());
            readModel.setUpdatedAt(event.getUpdatedAt());
            readModel.setVersion(event.getVersion());
            readModel.setSearchableText(event.getNewName() + " " + event.getNewEmail());

            userReadModelRepository.save(readModel);

            log.info("User read model updated: {}", event.getUserId());
            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to handle UserUpdatedEvent: {}", event.getUserId(), e);
            throw e;
        }
    }

    @KafkaListener(topics = "order-events", groupId = "user-read-model-group")
    public void handle(OrderCreatedEvent event, Acknowledgment ack) {
        try {
            UserReadModel readModel = userReadModelRepository.findById(event.getUserId())
                    .orElse(null);

            if (readModel != null) {
                readModel.setOrderCount(readModel.getOrderCount() + 1);
                readModel.setTotalOrderValue(readModel.getTotalOrderValue().add(event.getTotalAmount()));
                readModel.setLastOrderDate(event.getCreatedAt());

                userReadModelRepository.save(readModel);

                log.info("User read model updated with order info: {}", event.getUserId());
            }

            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to handle OrderCreatedEvent for user read model: {}", event.getUserId(), e);
            throw e;
        }
    }
}
```

## Feladat 4: Saga Pattern Implementation

### Order Processing Saga

```java
@Component
@Slf4j
@RequiredArgsConstructor
public class OrderProcessingSaga {

    private final EventPublisher eventPublisher;
    private final SagaStateRepository sagaStateRepository;
    private final UserServiceClient userServiceClient;
    private final PaymentServiceClient paymentServiceClient;
    private final InventoryServiceClient inventoryServiceClient;

    @SagaOrchestrationStart
    @KafkaListener(topics = "order-events", groupId = "order-saga-group")
    public void handle(OrderCreatedEvent event, Acknowledgment ack) {
        try {
            String sagaId = UUID.randomUUID().toString();

            SagaState sagaState = SagaState.builder()
                    .sagaId(sagaId)
                    .orderId(event.getOrderId())
                    .userId(event.getUserId())
                    .amount(event.getTotalAmount())
                    .currency(event.getCurrency())
                    .status(SagaStatus.STARTED)
                    .currentStep("VALIDATE_USER")
                    .steps(Arrays.asList("VALIDATE_USER", "RESERVE_INVENTORY", "PROCESS_PAYMENT", "CONFIRM_ORDER"))
                    .startedAt(Instant.now())
                    .build();

            sagaStateRepository.save(sagaState);

            // Start the saga
            OrderProcessingSagaStartedEvent sagaStartedEvent = new OrderProcessingSagaStartedEvent();
            sagaStartedEvent.setSagaId(sagaId);
            sagaStartedEvent.setOrderId(event.getOrderId());
            sagaStartedEvent.setUserId(event.getUserId());
            sagaStartedEvent.setAmount(event.getTotalAmount());
            sagaStartedEvent.setSteps(sagaState.getSteps());

            eventPublisher.publishEvent(sagaStartedEvent, "saga-events");

            // Start first step
            validateUser(sagaState);

            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to start order processing saga for order: {}", event.getOrderId(), e);
            throw e;
        }
    }

    @SagaOrchestrationStep
    public void validateUser(SagaState sagaState) {
        try {
            log.info("Saga {}: Validating user {}", sagaState.getSagaId(), sagaState.getUserId());

            // Validate user exists and is active
            UserValidationResponse response = userServiceClient.validateUser(sagaState.getUserId());

            if (response.isValid()) {
                // Move to next step
                sagaState.setCurrentStep("RESERVE_INVENTORY");
                sagaState.setStatus(SagaStatus.IN_PROGRESS);
                sagaStateRepository.save(sagaState);

                reserveInventory(sagaState);
            } else {
                // Compensate
                compensateOrderCreation(sagaState, "User validation failed: " + response.getReason());
            }

        } catch (Exception e) {
            log.error("User validation failed for saga: {}", sagaState.getSagaId(), e);
            compensateOrderCreation(sagaState, "User validation error: " + e.getMessage());
        }
    }

    @SagaOrchestrationStep
    public void reserveInventory(SagaState sagaState) {
        try {
            log.info("Saga {}: Reserving inventory for order {}", sagaState.getSagaId(), sagaState.getOrderId());

            InventoryReservationResponse response = inventoryServiceClient.reserveInventory(
                    InventoryReservationRequest.builder()
                            .orderId(sagaState.getOrderId())
                            .sagaId(sagaState.getSagaId())
                            .build());

            if (response.isSuccess()) {
                sagaState.setCurrentStep("PROCESS_PAYMENT");
                sagaState.addCompensationData("inventoryReservationId", response.getReservationId());
                sagaStateRepository.save(sagaState);

                processPayment(sagaState);
            } else {
                compensateOrderCreation(sagaState, "Inventory reservation failed: " + response.getReason());
            }

        } catch (Exception e) {
            log.error("Inventory reservation failed for saga: {}", sagaState.getSagaId(), e);
            compensateOrderCreation(sagaState, "Inventory reservation error: " + e.getMessage());
        }
    }

    @SagaOrchestrationStep
    public void processPayment(SagaState sagaState) {
        try {
            log.info("Saga {}: Processing payment for order {}", sagaState.getSagaId(), sagaState.getOrderId());

            PaymentRequest paymentRequest = PaymentRequest.builder()
                    .orderId(sagaState.getOrderId())
                    .userId(sagaState.getUserId())
                    .amount(sagaState.getAmount())
                    .currency(sagaState.getCurrency())
                    .sagaId(sagaState.getSagaId())
                    .build();

            PaymentResponse response = paymentServiceClient.processPayment(paymentRequest);

            if (response.isSuccess()) {
                sagaState.setCurrentStep("CONFIRM_ORDER");
                sagaState.addCompensationData("paymentId", response.getPaymentId());
                sagaStateRepository.save(sagaState);

                confirmOrder(sagaState);
            } else {
                // Start compensation
                compensateInventoryReservation(sagaState);
            }

        } catch (Exception e) {
            log.error("Payment processing failed for saga: {}", sagaState.getSagaId(), e);
            compensateInventoryReservation(sagaState);
        }
    }

    @SagaOrchestrationStep
    public void confirmOrder(SagaState sagaState) {
        try {
            log.info("Saga {}: Confirming order {}", sagaState.getSagaId(), sagaState.getOrderId());

            OrderConfirmedEvent event = new OrderConfirmedEvent();
            event.setOrderId(sagaState.getOrderId());
            event.setUserId(sagaState.getUserId());
            event.setSagaId(sagaState.getSagaId());
            event.setConfirmedAt(Instant.now());

            eventPublisher.publishEvent(event, "order-events");

            // Complete saga
            sagaState.setStatus(SagaStatus.COMPLETED);
            sagaState.setCompletedAt(Instant.now());
            sagaStateRepository.save(sagaState);

            log.info("Saga {} completed successfully", sagaState.getSagaId());

        } catch (Exception e) {
            log.error("Order confirmation failed for saga: {}", sagaState.getSagaId(), e);
            compensatePayment(sagaState);
        }
    }

    // Compensation methods
    @SagaCompensation
    public void compensateOrderCreation(SagaState sagaState, String reason) {
        try {
            log.info("Saga {}: Compensating order creation - {}", sagaState.getSagaId(), reason);

            OrderCancelledEvent event = new OrderCancelledEvent();
            event.setOrderId(sagaState.getOrderId());
            event.setReason(reason);
            event.setSagaId(sagaState.getSagaId());
            event.setCancelledAt(Instant.now());

            eventPublisher.publishEvent(event, "order-events");

            sagaState.setStatus(SagaStatus.COMPENSATED);
            sagaState.setCompletedAt(Instant.now());
            sagaState.setFailureReason(reason);
            sagaStateRepository.save(sagaState);

        } catch (Exception e) {
            log.error("Failed to compensate order creation for saga: {}", sagaState.getSagaId(), e);
            sagaState.setStatus(SagaStatus.FAILED);
            sagaStateRepository.save(sagaState);
        }
    }

    @SagaCompensation
    public void compensateInventoryReservation(SagaState sagaState) {
        try {
            String reservationId = (String) sagaState.getCompensationData().get("inventoryReservationId");
            if (reservationId != null) {
                inventoryServiceClient.releaseReservation(reservationId);
            }

            compensateOrderCreation(sagaState, "Payment processing failed");

        } catch (Exception e) {
            log.error("Failed to compensate inventory reservation for saga: {}", sagaState.getSagaId(), e);
        }
    }

    @SagaCompensation
    public void compensatePayment(SagaState sagaState) {
        try {
            String paymentId = (String) sagaState.getCompensationData().get("paymentId");
            if (paymentId != null) {
                paymentServiceClient.refundPayment(paymentId, sagaState.getAmount());
            }

            compensateInventoryReservation(sagaState);

        } catch (Exception e) {
            log.error("Failed to compensate payment for saga: {}", sagaState.getSagaId(), e);
        }
    }
}

// Saga State Entity
@Entity
@Table(name = "saga_state")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SagaState {

    @Id
    private String sagaId;

    @Column(nullable = false)
    private String orderId;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(nullable = false)
    private String currency;

    @Enumerated(EnumType.STRING)
    private SagaStatus status;

    @Column(nullable = false)
    private String currentStep;

    @ElementCollection
    @CollectionTable(name = "saga_steps")
    private List<String> steps;

    @Column(columnDefinition = "TEXT")
    @Convert(converter = MapToJsonConverter.class)
    private Map<String, Object> compensationData = new HashMap<>();

    private Instant startedAt;
    private Instant completedAt;
    private String failureReason;

    public void addCompensationData(String key, Object value) {
        this.compensationData.put(key, value);
    }
}

enum SagaStatus {
    STARTED,
    IN_PROGRESS,
    COMPLETED,
    COMPENSATED,
    FAILED
}
```

## Feladat 5: Dead Letter Queue és Error Handling

### Error Handling Configuration

```java
@Component
@Slf4j
@RequiredArgsConstructor
public class ErrorHandlingService {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private final MeterRegistry meterRegistry;
    private final DeadLetterEventRepository deadLetterRepository;

    @KafkaListener(topics = "dead-letter-queue", groupId = "error-handler-group")
    public void handleDeadLetterEvent(ConsumerRecord<String, Object> record, Acknowledgment ack) {
        try {
            log.warn("Processing dead letter event: {} from topic: {}",
                    record.key(), record.headers().lastHeader("kafka_original-topic"));

            // Store in database for investigation
            DeadLetterEvent deadLetterEvent = DeadLetterEvent.builder()
                    .id(UUID.randomUUID().toString())
                    .originalTopic(getHeaderValue(record.headers(), "kafka_original-topic"))
                    .originalPartition(getHeaderValueAsInt(record.headers(), "kafka_original-partition"))
                    .originalOffset(getHeaderValueAsLong(record.headers(), "kafka_original-offset"))
                    .originalKey(record.key())
                    .originalValue(objectMapper.writeValueAsString(record.value()))
                    .errorReason(getHeaderValue(record.headers(), "kafka_exception-message"))
                    .errorStackTrace(getHeaderValue(record.headers(), "kafka_exception-stacktrace"))
                    .receivedAt(Instant.now())
                    .status(DeadLetterStatus.PENDING)
                    .retryCount(0)
                    .build();

            deadLetterRepository.save(deadLetterEvent);

            // Send alert for critical events
            if (isCriticalEvent(record)) {
                sendCriticalEventAlert(deadLetterEvent);
            }

            meterRegistry.counter("dead_letter_events.received",
                    Tags.of(
                            Tag.of("original_topic", deadLetterEvent.getOriginalTopic()),
                            Tag.of("error_type", extractErrorType(deadLetterEvent.getErrorReason()))
                    )).increment();

            ack.acknowledge();

        } catch (Exception e) {
            log.error("Failed to process dead letter event", e);
            // Don't acknowledge - let it retry
        }
    }

    @Scheduled(fixedDelay = 300000) // Every 5 minutes
    public void retryDeadLetterEvents() {
        List<DeadLetterEvent> retryableEvents = deadLetterRepository
                .findByStatusAndRetryCountLessThan(DeadLetterStatus.PENDING, 3);

        for (DeadLetterEvent event : retryableEvents) {
            try {
                retryEvent(event);
            } catch (Exception e) {
                log.error("Failed to retry dead letter event: {}", event.getId(), e);

                event.setRetryCount(event.getRetryCount() + 1);
                event.setLastRetryAt(Instant.now());

                if (event.getRetryCount() >= 3) {
                    event.setStatus(DeadLetterStatus.FAILED);
                    sendFailedEventAlert(event);
                }

                deadLetterRepository.save(event);
            }
        }
    }

    private void retryEvent(DeadLetterEvent event) throws Exception {
        log.info("Retrying dead letter event: {}", event.getId());

        // Deserialize original event
        DomainEvent originalEvent = objectMapper.readValue(event.getOriginalValue(), DomainEvent.class);

        // Retry publishing to original topic
        ProducerRecord<String, Object> record = new ProducerRecord<>(
                event.getOriginalTopic(),
                event.getOriginalKey(),
                originalEvent);

        ListenableFuture<SendResult<String, Object>> future = kafkaTemplate.send(record);
        SendResult<String, Object> result = future.get(10, TimeUnit.SECONDS);

        // Mark as successful
        event.setStatus(DeadLetterStatus.RETRIED);
        event.setRetryCount(event.getRetryCount() + 1);
        event.setLastRetryAt(Instant.now());
        deadLetterRepository.save(event);

        log.info("Successfully retried dead letter event: {}", event.getId());
    }

    private boolean isCriticalEvent(ConsumerRecord<String, Object> record) {
        String eventType = getHeaderValue(record.headers(), "eventType");
        return Arrays.asList("PaymentProcessed", "OrderConfirmed", "UserCreated").contains(eventType);
    }

    private void sendCriticalEventAlert(DeadLetterEvent event) {
        // Implementation for sending alerts (email, Slack, etc.)
        log.error("CRITICAL EVENT FAILED: {} - {}", event.getOriginalTopic(), event.getErrorReason());
    }

    private void sendFailedEventAlert(DeadLetterEvent event) {
        log.error("DEAD LETTER EVENT PERMANENTLY FAILED: {} - {}", event.getId(), event.getErrorReason());
    }

    private String getHeaderValue(Headers headers, String key) {
        Header header = headers.lastHeader(key);
        return header != null ? new String(header.value(), StandardCharsets.UTF_8) : null;
    }

    private Integer getHeaderValueAsInt(Headers headers, String key) {
        String value = getHeaderValue(headers, key);
        return value != null ? Integer.valueOf(value) : null;
    }

    private Long getHeaderValueAsLong(Headers headers, String key) {
        String value = getHeaderValue(headers, key);
        return value != null ? Long.valueOf(value) : null;
    }

    private String extractErrorType(String errorReason) {
        if (errorReason == null) return "unknown";

        if (errorReason.contains("JsonProcessingException")) {
            return "serialization_error";
        } else if (errorReason.contains("TimeoutException")) {
            return "timeout_error";
        } else if (errorReason.contains("SQLException")) {
            return "database_error";
        } else {
            return "processing_error";
        }
    }
}

// Dead Letter Event Entity
@Entity
@Table(name = "dead_letter_events")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeadLetterEvent {

    @Id
    private String id;

    @Column(name = "original_topic")
    private String originalTopic;

    @Column(name = "original_partition")
    private Integer originalPartition;

    @Column(name = "original_offset")
    private Long originalOffset;

    @Column(name = "original_key")
    private String originalKey;

    @Column(name = "original_value", columnDefinition = "TEXT")
    private String originalValue;

    @Column(name = "error_reason", columnDefinition = "TEXT")
    private String errorReason;

    @Column(name = "error_stack_trace", columnDefinition = "TEXT")
    private String errorStackTrace;

    @Column(name = "received_at")
    private Instant receivedAt;

    @Enumerated(EnumType.STRING)
    private DeadLetterStatus status;

    @Column(name = "retry_count")
    private Integer retryCount;

    @Column(name = "last_retry_at")
    private Instant lastRetryAt;
}

enum DeadLetterStatus {
    PENDING,
    RETRIED,
    FAILED,
    RESOLVED
}
```

## Ellenőrző lista

- [ ] Kafka cluster konfigurálása partitioning-gal
- [ ] Event Sourcing pattern implementálása
- [ ] CQRS elválasztás Command/Query oldalon
- [ ] Saga pattern transaction management
- [ ] Dead Letter Queue error handling
- [ ] Event versioning és schema evolution
- [ ] Distributed tracing correlation IDs
- [ ] Idempotency kulcsok minden event-hez
- [ ] Outbox pattern reliable messaging
- [ ] Event store snapshotting nagy aggregátokhoz
- [ ] Monitoring és alerting
- [ ] Load testing message throughput
- [ ] Disaster recovery és backup stratégia

## Következő lépések

- Event Store sharding nagy volumen esetén
- Schema Registry integration (Confluent/Apicurio)
- Event-driven integration testing
- Multi-datacenter replication
- Performance optimization és tuning

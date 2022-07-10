# EventListener

This is the main type class, an instance of event listener allows to subscribe and dispatche events.

## constructor(name, options?)

Creates a new instance of EventListener.

### params

- **name: string** The name of the event.

- **options:  Partial\<EventListenerOptions\>** *(optional)* Option settings.

## subscribe(fn, options?)

It subscribes a listener function to the event.

The listener will be executed when the event will be dispatched.

### params
- **fn: ListenerFunction** A listener function to be executed when the event is dispatched.
- **options: Partial\<SubscribeOptions\>** *(optional)* Option settings.

### return: boolean

True if the subscribe had success, false otherwise.

## unsubscribe(fn, options?)

It unsubscribes a function listener, the function must be the same used in subscribe.

### params

- **fn: ListenerFunction** The function listener you want to unsubscribe.
- **options: Partial\<UnsubscribeOptions\>** *(optional)* Option settings.

### return: boolean

True if the unsubscribe had success, false otherwise.

# ListenerFunction(sender, data) => void
This is the type signature of a function listener that can be used to subscribe to an event as callback.

## params

- **sender: unknown** Who dispatched the event.
- **data: unknown** Data that can be passed when the event is dispatched.

# EventListenerOptions

The interface for a JSON object used to pass the configuration to EventListener constructor. 

## Properties

|Name|Type|Default|Description|
|---|---|---|---|
|logger|Logger|console \| NullLogger | It allows to set a custom logger, as default console is used if supported, otherwise loging will be disabled.

# SubscribeOptions

The interface for a JSON object used to pass the configuration to subscribe.

## params

|Name|Type|Default|Description|
|---|---|---|---|
|shouldThrowErrors|boolean|false|If set to true subscribe will throw an error if fails, otherwise it will just return false.|
|allowMultipleSubscribeSameFunction|boolean|false|If set to true allows to use multiple times the same function as listener.e<br />The usage is discouraged because you lose the only unique reference with the listener.|
|priority|Number|null|If set to a positive values it gives an higher priority to the listener function, if negative a lower priority.

# UnsubscribeOptions

|Name|Type|Default|Description|
|---|---|---|---|
|shouldThrowErrors|boolean|false|If set to true unsubscribe will throw an error if fails, otherwise it will just return false.|
|removeOnlyFirstOccurrence|boolean|false|If set to true, in the case the same function is subscribed multiple times, it will remove just one occurrence<br />The usage is discouraged, it will cause an unpredicatble order of execution of listeners.|


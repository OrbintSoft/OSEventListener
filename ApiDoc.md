# EventListener

This is the main type class, an instance of event listener allows to subscribe and dispatche events.

## constructor(name, options?)

Creates a new instance of EventListener.

### Parameters

- **name: string** The name of the event.

- **options:  Partial\<EventListenerOptions\>** *(optional)* Option settings.

## subscribe(fn, options?)

It subscribes a listener function to the event.

The listener will be executed when the event will be dispatched.

### Parameters

- **fn: ListenerFunction** A listener function to be executed when the event is dispatched.
- **options: Partial\<SubscribeOptions\>** *(optional)* Option settings.

### Return: boolean

True if the subscribe had success, false otherwise.

## unsubscribe(fn, options?)

It unsubscribes a function listener, the function must be the same used in subscribe.

### Parameters

- **fn: ListenerFunction** The function listener you want to unsubscribe.
- **options: Partial\<UnsubscribeOptions\>** *(optional)* Option settings.

### Return: boolean

True if the unsubscribe had success, false otherwise.

## dispatch(sender, data, options?)

It dispatch an event, all subscribed listener function will be executed in order or by priority passing sender and data as parameters.

### Parameters

- **sender: unknown**
Who is dispatching the event, usually you need to pass **this**, in fact you can pass any kind of data.

- **data: unknown**
Any kind of data you want to pass to the listener function. 

- **options: Partial\<DispatchOptions\>** *(optional)* Option settings.

## subscribeWithKey(fn, key, options?)

It allows to subscribe a function using a key as reference, so you don't need to keep a reference to the function.

### Parameters

- **fn: ListenerFunction** The function listener you want to subscribe.
- **key: string** The key you want use as reference for this subscribe.
- **options:Partial\<SubscribeWithKeyOptions\>**
*(optional)* Option settings.

### Return: boolean

True if the subscribe had success, false otherwise.

## unsubscribeWithKey(key, options?)

It allows to unsubscribe a set of function listeners using a key as reference.

### Parameters

- **key:string** The key you want to use as reference for this unsubscribe.
- **options:Partial\<UnubscribeWithKeyOptions\>**
*(optional)* Option settings.

### Return: boolean

True if the unsubscribe had success, false otherwise.

## waitUntilFirstDispatchAsync(options?)

If the event has never dispatched before, it waits until the first dispatch occurs, otherwise it will complete without waiting.

The beaviour can be modified to wait next dispatch in any case.

### Parameters

- **options:Partial\<WaitUntilFirstDispatchOptions\>** *(optional)* Option settings.

### Return: unknown

Per default it returs undefined, but if the dispatch is configured to store data, it will return the latest data passed to the dispatch.

# ListenerFunction(sender, data) => void
This is the type signature of a function listener that can be used to subscribe to an event as callback.

## Parameters

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

## Properties

|Name|Type|Default|Description|
|---|---|---|---|
|shouldThrowErrors|boolean|false|If set to true subscribe will throw an error if fails, otherwise it will just return false.|
|allowMultipleSubscribeSameFunction|boolean|false|If set to true allows to use multiple times the same function as listener.e<br />The usage is discouraged because you lose the only unique reference with the listener.|
|priority|Number|null|If set to a positive values it gives an higher priority to the listener function, if negative a lower priority.

# UnsubscribeOptions

The interface for a JSON object used to pass the configuration to unsubscribe.

## Properties

|Name|Type|Default|Description|
|---|---|---|---|
|shouldThrowErrors|boolean|false|If set to true unsubscribe will throw an error if fails, otherwise it will just return false.|
|removeOnlyFirstOccurrence|boolean|true|If set to false, in the case the same function is subscribed multiple times, it will remove all the occurence.<br />Consider the usage in case you allow to subscribe multiple times the same function. It can break the order of execution of listeners.

# DispatchOptions

The interface for a JSON object used to pass the configuration to dispatch.

## Properties

|Name|Type|Default|Description|
|---|---|---|---|
|shouldThrowErrors|boolean|false|If set to true, in case one of the listeners throws an exeception, will not be catched, so it will stop the execution of all subsequent listeners.<br />The usage is discouraged.|
|defer|boolean|false|By default all listeners are executed immediately after dispatch, blocking the execution subsequent code until all listeners are executed.<br />If set to true the execution of listeners will be demanded to javascript event manager and executed as soon as the execution of current task code terminates.<br />Useful if the execution of listeners is particularly slow, in any case the code will be executed on same thread.|
|storeData|boolean|false|If set to true, last dispatched data will be stored, to be used and returned by **waitUntilFirstDispatchAsync**.

# SubscribeWithKeyOptions

The interface for a JSON object used to pass the configuration to subscribeWithkey.

### Extends 
SubscribeOptions

## Properties

Same as **SubscribeOptions** plus:

|Name|Type|Default|Description|
|---|---|---|---|
|allowMultipleListernersPerKey|boolean|true|It allows to subscribe multiple functions with same key.|

# UnsubscribeWithKeyOptions

The interface for a JSON object used to pass the configuration to unsubscribeWithkey.

### Extends 
UnsubscribeOptions

Same as **UnsubscribeOptions** plus:

|Name|Type|Default|Description|
|---|---|---|---|
|removeOnlyFirstKeyedListener|boolean|false|If set to true it will remove only the first function listener found, when multiple listeners are subscribed with same key.<br />The usage is discouraged because it is not predictable whan listener will be removed. <br />If you want to unsubscribe just one function you can use **unsubscribe** passing the function reference.|

# WaitUntilFirstDispatchOptions

The interface for a JSON object used to pass the configuration to waitUntilFirstDispatch.

|Name|Type|Default|Description|
|---|---|---|---|
|resetFirstDispatchBefore|boolean|false|If set to true, it will wait for next dispatch in any case. The status will be reset before checking if dispatched occurred|
|resetFirstDispatchAfter|boolean|false|If set to true, after the promise is resolved it will reset the status. If dispatch already occured it will not wait it, but it will wait at next call.
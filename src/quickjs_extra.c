extern void sendToWindow(const char*);
static JSValue js_send(JSContext *ctx, JSValueConst this_val,
                       int argc, JSValueConst *argv)
{
    const char *str;
    JSValue json = JS_JSONStringify(ctx, argv[0], JS_UNDEFINED, JS_UNDEFINED);
    if (JS_IsException(json))
        return JS_EXCEPTION;
    str = JS_ToCString(ctx, json);
    sendToWindow(str);
    JS_FreeCString(ctx, str);

    return JS_UNDEFINED;
}

extern int setTimeout(const char*, double);
static JSValue js_setTimeout(JSContext *ctx, JSValueConst this_val,
                       int argc, JSValueConst *argv)
{
    const char *str;
    double millisecs = 0.;
    int id;
    
    str = JS_ToCString(ctx, argv[0]);
    if (!str)
        return JS_EXCEPTION;
    if (argc == 2 && JS_ToFloat64(ctx, &millisecs, argv[1]))
        return JS_EXCEPTION;
    id = setTimeout(str, millisecs);
    
    return JS_NewInt32(ctx, id);
}

extern void clearTimeout(int);
static JSValue js_clearTimeout(JSContext *ctx, JSValueConst this_val,
                               int argc, JSValueConst *argv)
{
    int id;
    if (JS_ToInt32(ctx, &id, argv[0]))
        return JS_EXCEPTION;
    clearTimeout(id);
    
    return JS_UNDEFINED;
}

extern int setInterval(const char*, double);
static JSValue js_setInterval(JSContext *ctx, JSValueConst this_val,
                       int argc, JSValueConst *argv)
{
    const char *str;
    double millisecs = 0.;
    int id;
    
    str = JS_ToCString(ctx, argv[0]);
    if (!str)
        return JS_EXCEPTION;
    if (argc == 2 && JS_ToFloat64(ctx, &millisecs, argv[1]))
        return JS_EXCEPTION;
    id = setInterval(str, millisecs);
    
    return JS_NewInt32(ctx, id);
}

extern void clearInterval(int);
static JSValue js_clearInterval(JSContext *ctx, JSValueConst this_val,
                               int argc, JSValueConst *argv)
{
    int id;
    if (JS_ToInt32(ctx, &id, argv[0]))
        return JS_EXCEPTION;
    clearInterval(id);
    
    return JS_UNDEFINED;
}

extern void crackURL(int);
static JSValue js_crackURL(JSContext *ctx, JSValueConst this_val,
                           int argc, JSValueConst *argv)
{
    return JS_UNDEFINED;
}

// TODO: remove that
extern void debugMe(const char*);
static JSValue js_debugMe(JSContext *ctx, JSValueConst this_val,
                           int argc, JSValueConst *argv)
{
    const char *str = JS_ToCString(ctx, argv[0]);
    debugMe(str);
    return JS_UNDEFINED;
}

#define EXTRA JS_CFUNC_DEF("send", 1, js_send ), \
        JS_CFUNC_DEF("setTimeout", 2, js_setTimeout ), \
        JS_CFUNC_DEF("clearTimeout", 1, js_clearTimeout ), \
        JS_CFUNC_DEF("setInterval", 2, js_setInterval ), \
        JS_CFUNC_DEF("clearInterval", 1, js_clearInterval ), \
        JS_CFUNC_DEF("crackURL", 1, js_crackURL ), \
        JS_CFUNC_DEF("debugMe", 1, js_debugMe ),

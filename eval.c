#include <string.h>
#include "quickjs/quickjs.h"

static JSRuntime* runtime = 0;
static JSContext* ctx = 0;

void eval(const char* str) {
    JSValue result;

    if (!runtime) {
        runtime = JS_NewRuntime();
        ctx = JS_NewContext(runtime);
    }

    result = JS_Eval(ctx, str, strlen(str), "<evalScript>", JS_EVAL_TYPE_GLOBAL);
    JS_FreeValue(ctx, result);
}

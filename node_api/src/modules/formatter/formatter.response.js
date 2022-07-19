exports.format = (data) => {
    return {
        success: data?.success ?? undefined,
        message: data?.message ?? undefined,
        response: data?.response ?? undefined,
        metadata: data?.metadata ?? undefined
    }
}
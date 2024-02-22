<script>
export default {
    name: "Alert",
    props: {
        type: {
            type: String
        },
        message: {
            type: String
        }
    }
}
</script>

<template>
    <div :class="type" class="alert">
        {{ message }}
    </div>
</template>

<style scoped>
.alert {
    padding: 0.75rem 1.25rem;
    margin-bottom: 1rem;
    border: 1px solid transparent;
    border-radius: 0.25rem;
}

.alert.success {
    background-color: #D6EDD9;
    color: #155724;
}

.alert.failed {
    background-color: #f8d7da;
    color: #58151c;
}

.alert.warning {
    color: #856404;
    background-color: #fff3cd;
}
</style>
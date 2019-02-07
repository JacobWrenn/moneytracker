<template>
    <div class="col2 text-center">
        <div v-if="note">
            <p>{{ note.content }}</p>
        </div>
        <p v-else>No note selected.</p>
    </div>
</template>

<script>
export default {
    props: ['note']
}
</script>
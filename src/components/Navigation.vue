<template>
    <header>
        <section>
            <a @click="clearNote">
                <img src='@/assets/logo.png'>
                <h3>Money Tracker</h3>
            </a>
            <ul class="inline">
                <li><a @click="clearNote">Home</a></li>
                <li><a @click="logout">Logout</a></li>
                <li><span class="button" @click="newNote">New List</span></li>
            </ul>
        </section>
    </header>
</template>

<script>
    const fb = require('../firebaseConfig.js')

    export default {
        methods: {
            logout() {
                fb.auth.signOut().then(() => {
                    this.$store.dispatch('clearData')
                    this.$store.dispatch('clearNote')
                    this.$router.push('/login')
                }).catch(() => {
                })
            },
            clearNote() {
                this.$store.dispatch('clearNote')
            },
            newNote() {
                this.$store.dispatch('newNote')
            }
        }
    }
</script>
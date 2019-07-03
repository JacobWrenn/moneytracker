<template>
    <header>
        <section>
            <a @click="clearList">
                <img src='@/assets/logo.png'>
                <h3>Money Tracker</h3>
            </a>
            <ul class="inline">
                <li><a @click="clearList">Home</a></li>
                <li><a @click="logout">Logout</a></li>
                <li><span class="button" @click="newList">New List</span></li>
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
                    this.$store.dispatch('clearList')
                    this.$router.push('/login')
                }).catch(() => {
                })
            },
            clearList() {
                this.$store.dispatch('clearList')
            },
            newList() {
                this.$store.dispatch('newList')
            }
        }
    }
</script>
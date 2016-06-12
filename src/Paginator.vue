<template>
    <div>
        <div v-if="pages > 1" class="ui small pagination menu">
            <span v-for="page in pageList">
                <a v-if="page==current" class="active item" @click="setCurrent(page)">{{ page }}</a>
                <a v-else class="item" @click="setCurrent(page)">{{ page }}</a>
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            pages: {},
            current: {},
        },

        computed: {
            pageList() {
                const pages = []
                for (let i = 1; i <= this.pages; i++) {
                    pages.push(i)
                }

                return pages
            },
        },

        methods: {
            setCurrent(page) {
                this.current = page
            },
        },
    }
</script>

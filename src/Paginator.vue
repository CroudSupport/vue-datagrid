<template>
    <div class="ui small pagination menu">
        <a class="item" v-for="page in pageList">{{ page }}</a>
    </div>
</template>

<script>
    export default {
        props: {
            active: {},
            pages: {},
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
    }
</script>
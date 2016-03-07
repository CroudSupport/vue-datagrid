<template>
    <div>
        <div class="ui basic secondary segment">
            <div class="ui two column grid">
                <div class="ui column">
                    <paginator :pages="pages"></paginator>
                </div>
                <div class="ui right aligned column form">
                    <div class="ui field">
                        <input v-model="search" placeholder="Search...">
                    </div>
                </div>
            </div>
        </div>
        <slot></slot>
        <div class="ui basic segment">
            <paginator :pages="pages"></paginator>
        </div>
    </div>
</template>

<script>
    import Paginator from './Paginator.vue'
    
    export default {
        props: {
            rows: {},
        },
        
        data() {
            return {
                search: '',
                pages: 3,    
            }
        },
        
        components: {
            Paginator,
        },
    }
</script>
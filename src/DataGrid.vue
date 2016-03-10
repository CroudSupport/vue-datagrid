<template>
    <div>
        <div class="ui basic secondary segment">
            <div class="ui two column grid">
                <div class="ui column">
                    <slot name="paginator">
                        <paginator v-if="meta.pagination" :current.sync="current" :pages="meta.pagination.total_pages"></paginator>
                    </slot>
                </div>
                <div class="ui right aligned column form">
                    <div class="ui field">
                        <input v-model="search" debounce="500" placeholder="Search...">
                    </div>
                </div>
            </div>
        </div>

        <slot name="records">
            <span v-if="meta.pagination">Showing records {{ firstRecord }} - {{ lastRecord }} of {{ meta.pagination.total }}</span>
        </slot>

        <slot name="headers">
            <div class="ui vertical segment">
                <div class="ui center aligned middle aligned equal width grid">
                    <div class="ui row">
                        <div v-for="header in headers" class="ui column">
                            <strong v-if="header.column" @click="setOrder(header.column)" class="ui header">
                                <a>{{ header.label }}</a>
                                <span v-if="order === header.column">
                                    <i v-if="direction.toLowerCase() === 'asc'" class="sort content ascending icon"></i>
                                    <i v-else class="sort content descending icon"></i>
                                </span>
                            </strong>
                            <strong v-else class="ui header">{{ header.label }}</strong>
                        </div>
                    </div>
                </div>
            </div>
        </slot>

        <div v-if="loading" class="ui very padded basic segment">
            <div class="ui active centered large inline text loader">Loading</div>
        </div>
        <div v-else>
            <slot name="rows">
                <div class="ui center aligned middle aligned equal width vertically divided grid">
                    <div v-for="row in flatten" class="ui row">
                        <div v-for="header in headers" class="ui column">
                            <span v-if="header.column === 'created_at'">{{ row[header.path] | moment "dddd, MMMM Do YYYY" }}</span>
                            <span v-else>{{ row[header.path] }}</span>
                        </div>
                    </div>
                </div>
            </slot>
        </div>

        <div class="ui basic segment">
            <slot name="paginator">
                <paginator v-if="meta.pagination" :current.sync="current" :pages="meta.pagination.total_pages"></paginator>
            </slot>
        </div>
    </div>
</template>

<script>
    import Paginator from './Paginator.vue'

    const _ = require('underscore')
    _.mixin(require('underscore.deep'))

    export default {
        props: {
            rows: {},
            resource: {},
            headers: {},
            order: {
                default: 'id',
            },
            direction: {
                default: 'desc',
            },
            perPage: {
                default: 5,
            },
            meta: {
                default: {},
            },
            beforeApiCall: {
                type: Function,
                default() {
                    return function() {
                        return true
                    }
                },
            },
        },

        data() {
            return {
                search: '',
                current: 1,
                loading: true,
            }
        },

        components: {
            Paginator,
        },

        methods: {
            get() {
                if (!this.beforeApiCall()) {
                    return
                }

                this.loading = true
                this.resource.get(this.criteria).then((response) => {
                    this.$set('rows', response.data.data)
                    this.$set('meta', response.data.meta)
                    this.loading = false
                })
            },
            setOrder(column) {
                if (this.order === column && this.direction !== 'DESC') {
                    this.direction = 'DESC'
                } else {
                    this.order = column
                    this.direction = 'ASC'
                }
            },
        },

        computed: {
            criteria() {
                return {
                    search: this.search,
                    page: this.current,
                    per_page: this.perPage,
                    order_by: `${this.order},${this.direction}`,
                }
            },
            firstRecord() {
                return this.meta.pagination.per_page * (this.meta.pagination.current_page - 1) + 1
            },
            lastRecord() {
                if ((this.meta.pagination.per_page * (this.meta.pagination.current_page - 1) + this.meta.pagination.per_page) > this.meta.pagination.total) {
                    return this.meta.pagination.total
                }
                return this.meta.pagination.per_page * (this.meta.pagination.current_page - 1) + this.meta.pagination.per_page
            },
            loadingClasses() {
                return {
                    ui: true,
                    active: this.loading,
                    large: true,
                    text: true,
                    loader: true,
                }
            },
            flatten() {
                const flat = []
                for (let i = 0; i < this.rows.length; i++) {
                    flat.push(_.deepToFlat(this.rows[i]))
                }

                return flat
            },
        },

        watch: {
            resource(resource) {
                this.get()
            },
            search() {
                this.current = 1
            },
            criteria() {
                this.get()
            },
        },
    }
</script>

<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-info">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price | currency }} | Quantity: {{ stock.quantity}})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input
                            type="number"
                            class="form-control"
                            placeholder="Quantity"
                            :class="{danger: insufficientQuantity}"
                            v-model="quantity">
                </div>
                <div class="pull-right">
                    <button
                            class="btn btn-success"
                            @click="sellStock"
                            :disabled="insufficientQuantity || isInactive">{{ label }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0,
                label: 'Sell'
            }
        },
        computed: {
            insufficientQuantity() {
                if(this.quantity > this.stock.quantity) {
                    this.label = 'Insufficient quantity';
                    return true;
                } else {
                    this.label = 'Sell';
                    return false;
                }
            },
            isInactive() {
                if(this.quantity <= 0) {
                    this.label = 'Sell';
                    return true;
                }
                return false;
            }
        },
        methods: {
            ...mapActions({
                placeSellOrder: 'sellStock'
            }),
            sellStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity
                };
                this.placeSellOrder(order);
                this.quantity = 0;
            }
        }
    }
</script>

<style scoped>
    .danger {
        background-color: lightpink;
        border: 1px solid red;
    }
</style>
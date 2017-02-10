<template>
    <div class="col-sm-6 col-md-4">
        <div class="panel panel-success">
            <div class="panel-heading">
                <h3 class="panel-title">
                    {{ stock.name }}
                    <small>(Price: {{ stock.price | currency }})</small>
                </h3>
            </div>
            <div class="panel-body">
                <div class="pull-left">
                    <input
                            type="number"
                            class="form-control"
                            placeholder="Quantity"
                            :class="{danger: insufficientFunds}"
                            v-model="quantity">
                </div>
                <div class="pull-right">
                    <button
                            class="btn btn-success"
                            @click="buyStock"
                            :disabled="insufficientFunds || isInactive">{{ label }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['stock'],
        data() {
            return {
                quantity: 0,
                label: 'Buy'
            }
        },
        computed: {
            funds(){
              return this.$store.getters.funds;
            },
            insufficientFunds(){
                if(this.quantity * this.stock.price > this.funds) {
                    this.label = 'Insufficient Funds';
                    return true;
                } else {
                    this.label = 'Buy';
                    return false;
                }
            },
            isInactive() {
                if(this.quantity <= 0) {
                    this.label = 'Buy';
                    return true;
                }
                return false;
            }
        },
        methods: {
            buyStock() {
                const order = {
                    stockId: this.stock.id,
                    stockPrice: this.stock.price,
                    quantity: this.quantity,
                    stockName: this.stock.name
                };
                console.log(order);
                this.$store.dispatch('buyStock', order);
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
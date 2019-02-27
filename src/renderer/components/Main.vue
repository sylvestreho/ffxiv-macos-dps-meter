<template>
    <div id="wrapper">
        <b-container>
            <b-row>
                <b-col cols="10">
                    <b-row>
                        <b-col cols="3">
                            <strong>DPS</strong>
                        </b-col>
                        <b-col cols="5">
                            <b-progress :value="dpsPercentage()" variant="success" key="success" />
                        </b-col>
                        <b-col cols="2">
                            <strong>{{ dpsValue() }}</strong>
                        </b-col>
                    </b-row>
                    <hr/>
                    <b-row>
                        <b-col cols="12"><h3>Logs</h3></b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12" id="console">
                            <div id="logs" v-html="$store.state.LogListener.logs">
                            </div>
                        </b-col>
                    </b-row>
                </b-col>
                <b-col cols="2">
                    <b-row>
                        <b-col cols="12">
                            <b-button class="btn btn-success" v-on:click="startParsing()">Start</b-button>
                        </b-col>
                    </b-row>
                    <hr>
                    <b-row>
                        <b-col cols="12">
                            <b-button class="btn btn-info">Configuration</b-button>
                        </b-col>
                    </b-row>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  export default {
    name: 'main',
    methods: {
      startParsing () {
        this.$store.dispatch('updateDps')
      },
      dpsPercentage () {
        return this.$store.state.LogListener.dpsPercentage
      },
      dpsValue () {
        return this.$store.state.LogListener.dps
      }
    }
  }
</script>

<style scoped>
    #console {
        background-color: #000000;
        color: #FFFFFF;
        height: 300px;
    }

    #logs {
        height: 280px;
        overflow: auto;
    }
</style>

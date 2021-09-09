<template>
  <div class="konsole">
    <div class="konsole-hist" ref="history" v-show="!locked">
      <Stdout v-for="(std, index) in stdout" :message="std"></Stdout>
    </div>
    <div class="konsole-stdin">
      <span class="prompt">{{prompt}}</span>
      <input ref="stdin"
             type="text"
             v-model="stdin"
             @keyup.enter="execute"/>
    </div>
  </div>
</template>

<script>
import Stdout from "./Stdout";

export default {
  name: "Konsole",
  components: {
    Stdout,
  },

  data: () => ({
    stdin: '',
    prompt: '$>',
    history: [''],
    stdout: [],
    locked: false,
    commands: [
      'IGNITIOMOBILIOMNIS',
      'INCIPEREMODUSMEDICA',
      'INCIPEREMODUSLUMINOS',
      'INCIPEREMODUSOSTIUM',
      'INCIPEREMODUSFABRICA',
      'INCIPEREMODUSCONNEXUS',
      'INCIPEREMODUSNAVIS',
      'EXITUSTEMPUSMOBILI',
      'EXITUSMODUSEXTREMITAS',
      'EXTREMITASMODUSADIGO',
      'RUPTURAOMNISPOTENTIA',
      'OMNISSIAH'
    ],
    special: {
      "FINIS": self => self.lock(),
      "INITUS": self => self.unlock(),
    }
  }),

  methods: {
    execute(event) {
      if (event.target.value === '') return
      this.stdin = ''

      const value = event.target.value;
      const cleaned = value.replace(/\s+/g, '').toUpperCase();

      if (Object.keys(this.special).includes(cleaned)) {
        // не логируем спец. команды
        return this.special[cleaned](this)
      }

      if (this.locked) return

      if (this.commands.includes(cleaned)) {
        this.$socket.emit("user-input", {"action": cleaned, "success": true});
      }
      this.$socket.emit("console", {"message": value})
      this.stdout.push({"content": value})
      this.scroll()
    },
    lock() {
      this.locked = true
      this.$emit("locked", {"state": "MODUS FINIS"})
    },
    unlock() {
      this.locked = false
      this.$emit("locked", {"state": "MODUS INITUS"})
    },
    scroll() {
      this.$refs.history.scrollTop = this.$refs.history.scrollHeight
    },
  },

  created() {
    this.$store.watch(
        () => {return this.$store.state.eventList},
        (newVal) => {
          this.stdout = newVal
          this.scroll()
        },
        {
          deep: true
        })
  },

  mounted() {
    this.$refs.stdin.focus()
  },

  activated() {
    this.scroll()
  }

}
</script>

<style lang="scss" scoped>
@import '../../styles/main';
@import '../../styles/typer';

  .konsole-stdin {

    margin-top: .5rem;
    display: flex;
    flex-direction: row;
    background: rgba(0, 0, 0, 0.2);
    padding: .25rem .5rem;

    .prompt {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }

    input {
      width: 100%;
      height: 1.75rem;
      font-size: 1.25rem;
      font-family: "VT220", monospace;
      border: 0;
      border-radius: 0;
      color: $main-green;
      background: none;
      caret-shape: block;

      &:focus, &:active {
        outline: none;
      }
    }
  }

  .konsole-hist {
    overflow-x: hidden;
    overflow-y: auto;
    max-height: 71vh;
    display: flex;
    flex-direction: column;
    padding-left: .75rem;
    padding-bottom: 1.15rem;
  }
</style>
<template>
    <div id="container">
        <div class="body-container">
            <div class="verify-title center">
                <img src="@/assets/img/LOGO_TPSMTG.png" />
            </div>
            <div class="form-group" v-if="verified == null">
                <a @click="verify">Klik disini untuk verifikasi akun anda</a>
            </div>
            <div class="form-group" v-if="verified == 1">
                <p>Silahkan cek kembali email anda untuk melihat username dan password</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import toast from '@/assets/js/toast';

export default {
    components: {

    },
    setup() {
    },
    data() {
        let url = document.URL;
        const splitToken = url.split("=");
        const getToken = splitToken[1];
        return {
            title: 'Verify Your Account',
            token: getToken,
            verified: null,
        };
    },
    mounted() { },
    methods: {
        goto: function (comp, p) {
            console.log(comp);
            this.$root.goto(comp);
        },
        verify: async function () {
            this.$root.loader = true;

            await axios.get(import.meta.env.VITE_API_PATH + 'auth/valid?token=' + this.token)
                .then((r) => {
                    if (r.status == 200) {
                        this.$root.loader = false;
                        this.verified = 1;
                    }
                }).catch((e) => {
                    this.$root.loader = false;
                    const err = e.response.data;
                    toast.warning(err.message);
                });
        }
    }
}
</script>

<style scoped>
#container {
    display: flex;
    place-items: center;
    height: 100vh;
}

#container>* {
    margin: 0 auto;
    padding: 2em;
    background: var(--vt-color-step-950);
    box-shadow: 0 1em 4em var(--vt-color-step-100);
    border-radius: 2em;
}

.verify-title {
    font-size: 24px;
}

.verify-title img {
    width: 100px;
    height: auto;
}

.form-group {
    text-align: center;
    padding: 50px;
}

.form-group a {
    font-size: 24px;
    cursor: pointer;
}

.form-group p {
    font-size: 24px;
    /* cursor: pointer; */
}
</style>
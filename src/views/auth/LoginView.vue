<template>
    <div id="container">
        <div class="body-container">
            <div class="login-title center">
                <img src="@/assets/img/logo_mtg.png" />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" v-model="username" placeholder="Nama Pengguna" />
            </div>
            <div class="form-group">
                <input class="form-control" type="text" v-if="showPassword" v-model="password" placeholder="Kata Sandi"
                    @keyup.enter="submit" />
                <input class="form-control" type="password" v-else="password" v-model="password"
                    placeholder="Kata Sandi" @keyup.enter="submit" />
                <a href="javascript:void(0)" v-if="showPassword" class="show-password" @click="show()">Hide
                    Password</a>
                <a href="javascript:void(0)" v-else class="show-password" @click="show()">Show Password</a>
            </div>
            <div class="center">
                <button class="btn btn-primary" pe="button" @click="submit">Masuk</button>
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
        return {
            title: 'Login Page',
            username: null,
            password: null,
            showPassword: false,
        };
    },
    async mounted() {
        // await this.cekToken();
    },
    methods: {
        show() {
            this.showPassword = !this.showPassword;
        },
        goto: function (comp, p) {
            console.log(comp);
            this.$root.goto(comp);
        },
        validation: function () {
            if (this.username == null || this.username == '') {
                toast.warning("Nama pengguna tidak boleh kosong");
                return false;
            } else if (this.password == null) {
                toast.warning("Kata sandi tidak boleh kosong");
                return false;
            }

            return true;
        },
        submit() {
            localStorage.setItem("auth", JSON.stringify({
                id: 1,
                email: 'admnistrator@gmail.com',
                full_name: 'ADMINISTRATOR',
                token: 'HSADIH819yhjsahd89h1j3hjkkA*&jkSLA*!HJ!KSA1qdjkasjdk',
                customer_code: 'MC001',
                mst_roles_id: 2,
                pic: ''
            }))
            location.reload();
            sessionStorage.setItem('page', 'DashboardView')
        },
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
    max-width: 270px;
    margin: 0 auto;
    padding: 2em;
    background: var(--vt-color-step-950);
    box-shadow: 0 1em 4em var(--vt-color-step-100);
    border-radius: 2em;
}

.login-title {
    font-size: 24px;
}

.login-title img {
    width: 100px;
    height: auto;
}

.center {
    margin: 10px 0;
}

a {
    text-decoration: none;
}

.show-password {
    text-decoration: underline;
    display: block;
    text-align: right;
    font-size: 11px;
    margin: 2px 5px;
    background: none;
    color: black;
}
</style>
<template>
    <div id="container">
        <div class="body-container">
            <div class="login-title center">
                <img src="@/assets/img/logo_kbp.png" />
            </div>
            <div class="form-group">
                <input class="form-control form-control-lg rounded-4 " type="email" v-model="email" placeholder="Email" />
            </div>
            <div class="form-group" style="padding-bottom: 40px;">
                <input class="form-control form-control-lg rounded-4" type="password" v-model="password" placeholder="Kata Sandi" @keyup.enter="submit" />
            </div>
            <div class="center ">
                <button class="btn rounded-5 custom-btn" type="button" @click="submit">Masuk</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import toast from '@/assets/js/toast';

export default {
    setup() {
    },
    data() {
        return {
            title: 'Login Page',
            email: null,
            password: null
        };
    },
    mounted() { },
    methods: {
        goto: function (comp, p) {
            console.log(comp);
            this.$root.goto(comp);
        },
        validation: function () {
            if (this.email == null || this.email == '') {
                toast.warning("Nama pengguna tidak boleh kosong");
                return false;
            } else if (this.password == null) {
                toast.warning("Kata sandi tidak boleh kosong");
                return false;
            }

            return true;
        },
        submit: async function () {
            var that = this;
            if (!this.validation()) return false;

            let post = {
                email: this.email,
                password: this.password,
                device_id: '1233'
            };

            this.$root.loader = true;

            await axios.post(this.$root.api_path + 'api/auth/loginWeb', post)
                .then((r) => {
                    this.$root.loader = false;
                    if (r.status) {
                        var data = r.data.data;
                        console.log(data)
                        localStorage.setItem("auth", JSON.stringify(
                                {
                                    id: data.id,
                                    email: data.email,
                                    nama: data.nama,
                                    nickname: data.nickname,
                                    nomor_hp: data.nomor_hp,
                                    token: data.access_token,

                                }
                            ))
                            sessionStorage.setItem('page', 'DashboardView')
                            location.reload();
                            that.$root.goto('DashboardView');
                        // validasi role akses
                        // if (role_id == 1) {
                        //     toast.warning('Unauthorized');
                        //     return false;
                        // } else {
                        //     localStorage.setItem("auth", JSON.stringify(
                        //         {
                        //             id: data.id,
                        //             customer_code: data.customer_code,
                        //             mst_roles_id: data.mst_roles_id,
                        //             pic: data.pic,
                        //             email: data.email,
                        //             token: data.access_token,
                        //             gender: data.profile_gender
                        //         }
                        //     ))
                        //     sessionStorage.setItem('page', 'DashboardView')
                        //     location.reload();
                        //     that.$root.goto('DashboardView');
                        // }
                    }
                }).catch((e) => {
                    this.$root.loader = false;
                    // const err = e.response.data;
                    // toast.warning(err.message);
                    console.log(e)
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
    background: var(--vt-color-step-1000);
    background: linear-gradient(130deg, #137ecf 30%, #00135d 100%);
}

#container>* {
    margin: 0 auto;
    padding: 2em;
    background: var(--vt-color-step-950);
    box-shadow: 0 1em 4em var(--vt-color-step-50);
    border-radius: 2em;
    height: 40vh;
    width: 45vh;

}

.login-title {
    font-size: 24px;
}

.login-title img {
    width: 100px;
    height: auto;
}

.custom-btn {
    background: linear-gradient(147deg, #137ecf 50%, #00135d 100%);
    color: white;
    width: 120px; 
    height: 50px; 
    padding: 10px 20px;  
    font-size: 16px;  
    border: none; 
    border-radius: 5px; 
}

</style>
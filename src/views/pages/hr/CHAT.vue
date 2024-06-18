``<template>
<Pages :title="title">
    <!-- Halaman utama setelah login -->
    <div class="row">
        <div class="col-md-3">
            <div class="card cursor-pointer">
                <div class="card-header">
                    <h5>RAIHAN MAULANA</h5>
                </div>
            </div>
        </div>

        <div class="col-md-9" style="position: relative; background-color: #005ca1; ">
            <div class="input-group">
                <template v-for="(value, key, index) in chat" :key="key">
                    <div :class="value.tipe == 'android' ?'message received':'message sent'">
                        <p>{{ value.chat }}</p>
                    </div>
                </template>
            </div>

            <form @submit.prevent="storeDataFirestore()" class="d-flex p-3 w-100" style="position: sticky; bottom: 0; width: 100%; background-color: #005ca1;">
                <div class="me-3 w-100">
                    <input v-model="value_inputChat" class="form-control" placeholder="Masukkan Pesan" fill="outline" />
                </div>
                <div>
                    <button class="btn btn-secondary" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                        </svg>
                    </button>
                </div>
            </form>
            
        </div>
    </div>

</Pages>
</template>

<script>
import Pages from '@/components/template/Pages.vue';

export default {
    components: {
        Pages,
    },
    created() {
        this.getDataFromFirebase();

    },
    mounted() {},
    data() {
        const auth = JSON.parse(localStorage.getItem('auth'));
        return {
            title: 'CHAT',
            chat: [],
            temp_chat: [],
            abc: '',
            value_inputChat: '',
            temp_docChat: {
                id: 'paklaring'
            },

            fullname: auth.nama,
        }
    },
    methods: {

        getDataFromFirebase: async function () {
            const myThis = this;

            this.temp_chat = [];

            try {
                this.$root.onSnapshotFirebase(this.$root.docFirebase(this.$root.dbfirebase, "allchats", "chat"), (snap) => {
                    if (this.$root.flagNotif == false) {
                        this.$root.flagNotif = true;
                        return;
                    }
                    console.log(snap.data());
                    if (snap.data().tipe == 'android') {
                        this.chat.push(snap.data());
                    }
                });
                //alert("BBB");

            } catch (e) {
                console.log(e);
            }

        },
        xxgetDataFromFirebase: async function () {
            const myThis = this;

            this.temp_chat = [];

            try {
                this.$root.onSnapshotFirebase(this.$root.collectionFirebase(this.$root.dbfirebase, 'allchats'),
                    async (snap) => {
                            const allDocs = snap.docs.map(doc => ({
                                id: doc.id,
                                ...doc.data()
                            }));

                            console.log(allDocs);
                            // await this.$root.sleep(15000);
                            Object.keys(allDocs).forEach(key => {
                                //this.$root.collectionFirebase(this.$root.dbfirebase, `allchats/${this.temp_docChat.id}/messages`)
                                if (allDocs[key].id == 'logChat' && allDocs[key].sumber == 'android') {
                                    var xyz = allDocs[key].id2;
                                    var unsubscribe = this.$root.onSnapshotFirebase(this.$root.collectionFirebase(this.$root.dbfirebase, `allchats/${allDocs[key].id1}/messages`),
                                        (snap) => {
                                            const allDocsx = snap.docs.map(doc => ({
                                                id: doc.id,
                                                ...doc.data()
                                            }));

                                            //unsubscribe();
                                            console.log(allDocsx);

                                            Object.keys(allDocsx).forEach(key => {
                                                console.log(allDocsx[key].id);
                                                console.log(xyz);
                                                if (allDocsx[key].id == xyz) {
                                                    if (this.$root.flagNotif == false) {
                                                        this.$root.flagNotif = true;
                                                        return;
                                                    }
                                                    //this.abc = allDocsx[key].message;
                                                    this.chat.push(allDocsx[key].message);
                                                    //this.temp_chat.push(allDocsx[key].message );
                                                }

                                            });
                                        },
                                        (error) => {
                                            console.log(error);
                                        }
                                    );
                                }

                            });
                        },
                        (error) => {
                            console.log(error);
                        }
                );
            } catch (e) {
                console.log(e);
            }

        },
        storeDataFirestore: async function () {
            try {
                this.$root.isLoading = true;

                this.$root.updateDocFirebase(this.$root.docFirebase(this.$root.dbfirebase, 'allchats', 'chat'), {
                    "nama": this.fullname,
                    "chat": this.value_inputChat,
                    "time": new Date(),
                    "tipe": 'web'
                });

                const chat = {
                    nama: this.fullname,
                    chat: this.value_inputChat,
                    time: new Date(),
                    tipe: 'web'
                }

                this.chat.push(chat);
                this.value_inputChat = '';
                console.log(this.chat)
            } catch (e) {
                console.log(e);
            }
            this.$root.isLoading = false;
        },
        xxxstoreDataFirestore: async function () {
            try {
                this.$root.isLoading = true;
                if (this.temp_docChat == null) {
                    const dataChat = {
                        "nama": "OKKY DHELFILANO",
                        "created_at": new Date(),
                    };
                    const docRef = await this.$root.addDocFirebase(this.$root.collectionFirebase(this.$root.dbfirebase, "allchats"), dataChat);
                    this.temp_docChat = docRef;
                }

                const msg = {
                    "message": this.value_inputChat,
                    "created_at": new Date(),
                }
                const docRef2 = await this.$root.addDocFirebase(this.$root.collectionFirebase(this.$root.dbfirebase, `allchats/${this.temp_docChat.id}/messages`), msg);

                await this.$root.updateDocFirebase(
                    this.$root.docFirebase(this.$root.dbfirebase, 'allchats', 'logChat'), {
                        id1: this.temp_docChat.id,
                        id2: docRef2.id,
                        id_pic: 9,
                        sumber: 'web',
                        "created_at": new Date(),
                    }
                );

                this.chat.push(this.value_inputChat);
            } catch (e) {
                console.log(e);
            }
            this.$root.isLoading = false;
        },

    },
}
</script>

<style scoped>
.cursor-pointer {
    cursor: pointer;
}

.input-group {
    padding: 10px 12px;
    flex-direction: column;
    border-radius: 10px;
    overflow-y: auto;
    height: 85vh;
    display: flex;
}

.message {
    max-width: 70%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    word-wrap: break-word;
    display: inline-block;
}

.message.received {
    background-color: hsl(0, 0%, 87%);
    align-self: flex-start;
}

.message.received::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-right: 15px solid hsl(0, 0%, 87%);
    border-bottom: 10px solid transparent;
    left: -15px;
    top: 10px;
}

.message.sent {
    background-color: #ffffff;
    align-self: flex-end;
    text-align: right;
}

.message.sent::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-left: 15px solid #ffffff;
    border-bottom: 10px solid transparent;
    right: -15px;
    top: 10px;
}
</style>

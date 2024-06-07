<template>
<Pages :title="title">
    <!-- Halaman utama setelah login -->
    <div class="col-md-12">

        <div class="row mb-3">
            <!-- PIC -->
            <label for="inputPic" class="col-sm-2 col-form-label col-form-label-md">TAMBAH PIC</label>
            <div class="col-sm-8 pb-3">
                <select class="form-select form-select-md" aria-label="Small select example" id="inputPic">
                    <option value="" disabled selected>Pilih PIC...</option>
                </select>
            </div>
            <!-- PIC End -->

            <!-- Simpan -->
            <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary rounded-4" value="Simpan"><i class='bx bx-save bx-md'></i></button>
            </div>
            <!-- Simpan End -->
        </div>

        <!-- Table -->
        <div style="overflow-x:auto; background-color: #0d6efd;">
            <table class="table table-striped table-hover">
                <thead class="table">
                    <tr>
                        <th class="text-center" scope="col">#</th>
                        <th scope="col">PIC</th>
                        <th scope="col">NICKNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">NO. TELP</th>
                        <th class="text-center"  scope="col">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in users" :key="index">
                        <td class="text-center align-middle">{{ index + 1 }}</td>
                        <td class="align-middle">{{ user.nama }}</td>
                        <td class="align-middle">{{ user.nickname }}</td>
                        <td class="align-middle">{{ user.email }}</td>
                        <td class="align-middle">{{ user.nomor_hp }}</td>
                        <td class="text-center align-middle">
                            <div class="d-inline-flex bd-highlight">
                                <div class="button btn-primary float-end mx-1">
                                    <button type="button" class="btn btn-primary mx-1" @click="openModalEditPic(user)">
                                        <i class='bx bx-edit'></i>
                                    </button>
                                    <button type="button" class="btn btn-danger mx-1">
                                        <i class='bx bx-trash'></i>
                                    </button>
                                </div>
                                <!-- <button type="button" class="btn btn-danger mx-1"  data-bs-toggle="modal" data-bs-target="#deletePic">
                                    <i class='bx bx-trash'></i>
                                </button> -->
                            </div>
                        </td>
                    </tr>
                    <tr class="text-center" v-if="users.length == 0">
                        <td colspan="6">Data tidak ditemukan</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Table end -->

    </div>

</Pages>

<!-- Modal Edit PIC -->
<div class="modal fade" id="editModalPic" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-primary text-center w-100" id="exampleModalLabel">EDIT</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div v-if="editedPic != null" class="modal-body">

                <!-- Edit Pic -->
                <div class="row mb-3">
                    <label for="editNickname" class="col-sm-3 col-form-label">PIC</label>
                    <div class="col-sm-7">
                        <input v-model="editedPic.nama" type="text" class="form-control" id="editNickname" readonly>
                    </div>
                </div>
                <!-- Edit Pic End -->

                <!-- Edit Nickname -->
                <div class="row mb-3">
                    <label for="editNickname" class="col-sm-3 col-form-label">NICKNAME</label>
                    <div class="col-sm-7">
                        <input v-model="editedPic.nickname" type="text" class="form-control" id="editNickname">
                    </div>
                </div>
                <!-- Edit Nickname End -->

                <!-- Edit Email -->
                <div class="row mb-3">
                    <label for="editEmail" class="col-sm-3 col-form-label">EMAIL</label>
                    <div class="col-sm-7">
                        <input v-model="editedPic.email" type="text" class="form-control" id="editEmail">
                    </div>
                </div>
                <!-- Edit Email End -->

                <!-- Edit No .Telp -->
                <div class="row mb-3">
                    <label for="edittelp" class="col-sm-3 col-form-label">NO. TELP</label>
                    <div class="col-sm-7">
                        <input v-model="editedPic.nomor_hp" type="text" class="form-control" id="edittelp">
                    </div>
                </div>
                <!-- Edit No .Telp End -->

            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button @click="editPic()" class="btn btn-primary"><i class='bx bx-save bx-md'></i></button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Edit PIC End -->

<!-- Modal Delete PIC -->
<!-- <div class="modal fade" id="deletePic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">Delete</h1>
                <button type="button" id="iniModalDelete" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                Yakin Ingin Menghapus Data?
            </div>
            <div class="modal-footer  d-flex justify-content-center">
                <button type="button" class="btn btn-danger" @click="deleteUser()"><i class='bx bx-trash'></i></button>
            </div>
        </div>
    </div>
</div> -->
<!-- Modal Delete PIC End -->
</template>

<script>
import Pages from '@/components/template/Pages.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    components: {
        Pages,
    },

    async mounted() {
        await this.getPic();

    },

    data() {
        return {
            title: 'PIC',

            users: [],

            editedPic: null
        }
    },

    methods: {

        async getPic() {
            try {
                this.$root.loader = true;
                const response = await axios.get(`http://localhost:8001/api/Pic/getPic`);
                // console.log(re);
                this.users = response.data.data; // Atur data yang diterima ke properti roles
                console.log(this.users);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
            } finally {
                this.$root.loader = false;
            }
        },

        openModalEditPic(user) {
            this.editedPic = user;
            this.$root.actionModal('editModalPic', 'show');
        },

        async editPic() {
            console.log(this.editedPic.id);
            if (this.editedPic.id) {
                let editSuccessful = false;

                try {
                    this.$root.loader = true;
                    const response = await axios.put(`http://localhost:8001/api/Pic/editPic/${this.editedPic.id}`, this.editedPic);
                    if (response.data.status) {
                        editSuccessful = true;

                        await this.getPic();
                    } else {
                        Swal.fire('Error!', 'Failed to edit Pic.', 'error');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    Swal.fire('Error!', 'Gagal Mengedit Data.', 'error');
                } finally {
                    this.$root.loader = false;
                    this.$root.actionModal('editModalPic', 'hide');

                    if (editSuccessful) {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully",
                            text: "Data Berhasil di edit",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                }
            }
        },
    }
}
</script>

<style scoped>
.table th {
    background-color: #0d6efd;
    /* Warna latar belakang header kolom */
    color: rgb(255, 255, 255);
    /* Warna teks header kolom */
}

thead th {
    font-weight: bold;
    height: 65px;
    vertical-align: middle;
    border: 3px solid #5a88ff;
}
</style>

<template>
<Pages :title="title">
    <!-- Halaman utama setelah login -->
    <div class="col-md-12">

        <div class="row mb-3">
            <!-- PIC -->
            <form @submit.prevent="newAllPic()">
                <label for="inputPic" class="col-sm-2 col-form-label col-form-label-md">TAMBAH PIC</label>
                <div class="col-sm-12 d-flex align-items-center pb-3">
                    <select class="form-select form-select-md me-2" aria-label="Small select example" id="inputPic" v-model="newPic.users_id">
                        <option value="" disabled selected>Pilih PIC...</option>
                        <option v-for="(input, key) in users" :key="key" :value="input.id">{{ input.nama }}</option>
                    </select>
                    <button type="submit" class="btn rounded-4" value="Simpan" style="background-color: #005ca1;">
                        <i class='bx bx-save bx-md' style='color:#ffffff'></i>
                    </button>
                </div>
                <!-- PIC End -->
            </form>
        </div>

        <!-- Table -->
        <div style="overflow-x:auto; background-color: #005ca1;">
            <table class="table table-striped table-hover">
                <thead class="table">
                    <tr>
                        <th class="text-center" scope="col">#</th>
                        <th scope="col">PIC</th>
                        <th scope="col">NICKNAME</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">NO. TELP</th>
                        <th class="text-center" scope="col">AKSI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(pic, index) in AllPic" :key="index">
                        <td class="text-center align-middle">{{ index + 1 }}</td>
                        <td class="align-middle">{{ pic.nama }}</td>
                        <td class="align-middle">{{ pic.nickname }}</td>
                        <td class="align-middle">{{ pic.email }}</td>
                        <td class="align-middle">{{ pic.nomor_hp }}</td>
                        <td class="text-center align-middle">
                            <div class="d-inline-flex bd-highlight">
                                <div class="button btn-primary float-end mx-1">
                                    <button type="button" class="btn btn-primary mx-1" @click="openModalEditPic(pic)">
                                        <i class='bx bx-edit'></i>
                                    </button>
                                    <button type="button" class="btn btn-danger mx-1"  @click="openModalDeletePic(pic.id)">
                                        <i class='bx bx-trash'></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="text-center" v-if="AllPic.length == 0">
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

<!-- Modal Delete Pic -->
<div class="modal fade" id="hapusPic" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-danger text-center w-100" id="staticBackdropLabel">Delete</h1>
                <button type="button" id="iniModalDelete" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-center">
                Yakin Ingin Menghapus Pic?
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn btn-danger" @click="deletePic()"><i class='bx bx-trash'></i></button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Delete Pic End -->
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
        await this.getAllPic();

        await this.getUsers();
    },

    data() {
        return {
            title: 'PIC',

            users: [],

            AllPic: [],

            newPic: {
                users_id: null
            },

            deletePicId: null,

            editedPic: null
        }
    },

    methods: {

        async getAllPic() {
            try {
                this.$root.loader = true;
                const response = await axios.get(`http://localhost:8001/api/AllPic/getAllPic`);
                // console.log(re);
                this.AllPic = response.data.data;
                console.log(this.AllPic);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data');
            } finally {
                this.$root.loader = false;
            }
        },

        async getUsers() {
            try {
                const response = await axios.get(`http://localhost:8001/api/Users/getData`);
                this.users = response.data.data;
                console.log(this.users);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data');
            } finally {}
        },

        async newAllPic() {
            try {
                this.$root.loader = true;
                if (this.newPic.users_id) {
                    await axios.post(`http://localhost:8001/api/AllPic/postAllPic`, this.newPic);
                    await this.getAllPic();
                    Swal.fire({
                        icon: "success",
                        title: "Successfully",
                        text: "Pic Berhasil Di Tambah",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Reset form
                    this.newPic.users_id = null;
                } else {
                    alert('Gagal Menambah Pic');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data');
            } finally {
                this.$root.loader = false;
            }
        },

        openModalEditPic(pic) {
            this.editedPic = pic;
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

        openModalDeletePic(id) {
            this.deletePicId = id;
            this.$root.actionModal('hapusPic', 'show');
        },

        async deletePic() {
            if (this.deletePicId) {
                let deleteSuccessful = false;

                try {
                    this.$root.loader = true;
                    const response = await axios.delete(`http://localhost:8001/api/AllPic/deleteAllPic/${this.deletePicId}`);
                    if (response.data.status) {
                        deleteSuccessful = true;
                        await this.getAllPic();
                    } else {
                        Swal.fire('Error!', 'Gagal Menghapus Pic.', 'error');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    Swal.fire('Error!', 'Gagal Menghapus Pic.', 'error');
                } finally {
                    this.$root.loader = false;
                    this.$root.actionModal('hapusPic', 'hide');
                    if (deleteSuccessful) {
                        Swal.fire({
                            icon: "success",
                            title: "Successfully",
                            text: "Pic Berhasil DiHAPUS",
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
    background-color: #005ca1;
    /* Warna latar belakang header kolom */
    color: rgb(255, 255, 255);
    /* Warna teks header kolom */
}

thead th {
    font-weight: bold;
    height: 65px;
    vertical-align: middle;
    border: 3px solid #005ca1;
}
</style>

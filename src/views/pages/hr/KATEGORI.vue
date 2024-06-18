<template>
    <Pages :title="title">
        <!-- Halaman utama setelah login -->
        <div class="col-md-12">
    
            <!-- Button Filter -->
            <div class="mb-3">
                <CDropdown>
                    <CDropdownToggle style="background-color: #005ca1;"><i class='bx bxs-filter-alt text-light'></i></CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="filters.klien" id="filterKlien" @change="applyFilter">
                                <label class="form-check-label" for="filterKlien">
                                    <i class='bx bx-buildings text-primary'></i> KLIEN
                                </label>
                            </div>
                        </CDropdownItem>
                        <CDropdownItem>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="filters.karyawan" id="filterKaryawan" @change="applyFilter">
                                <label class="form-check-label" for="filterKaryawan">
                                    <i class='bx bxs-user text-success'></i> KARYAWAN
                                </label>
                            </div>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
            </div>
            <!-- Button Filter End -->
    
            <!-- Table -->
            <div style="overflow-x:auto; background-color: #005ca1;">
                <table class="table table-striped table-hover">
                    <thead class="table">
                        <tr>
                            <!-- <th scope="col">#</th> -->
                            <!-- <th scope="col">IKON</th> -->
                            <th scope="col" class="text-center align-middle">ROLE</th>
                            <th scope="col">KATEGORI</th>
                            <!-- <th scope="col">PRIORITAS</th> -->
                            <th scope="col" class="text-center align-middle">AKSI</th>
                        </tr>
                    </thead>
                    <tbody class="table">
                        <tr v-for="(cat, index) in filteredCat" :key="index">
                            <!-- <td class="text-center align-middle">{{ index + 1 }}</td> -->
                            <!-- <td class="text-center align-middle">{{ cat.icon }}</td> -->
                            <td class="text-center align-middle">
                                <i v-if="cat.code_role === 'R1'" class='bx bx-buildings bx-sm bx-tada-hover text-primary'></i>
                                <i v-else class='bx bxs-user bx-sm bx-tada-hover text-success'></i>
                            </td>
                            <td class="align-middle">{{ cat.nama_kategori }}</td>
                            <!-- <td class="text-center align-middle">{{ cat.prioritas }}</td> -->
                            <td class="text-center align-middle">
                                <div class="d-inline-flex bd-highlight">
                                    <div class="button btn-primary float-end mx-1">
                                        <button type="button" class="btn btn-primary mx-1" data-bs-toggle="modal" @click="openModalEditCat(cat)">
                                            <i class='bx bx-edit'></i>
                                        </button>
                                    </div>
                                    <button type="button" class="btn btn-danger mx-1" @click="openModalDeleteCat(cat.id)">
                                        <i class='bx bx-trash'></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr class="text-center" v-if="filteredCat.length == 0">
                            <td colspan="6">Data tidak ditemukan</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!-- Table end -->
    
        </div>
    </Pages>
    
    <!-- Modal Delete Kategori -->
    <div class="modal fade" id="hapusKategori" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-danger text-center w-100" id="staticBackdropLabel">Delete</h1>
                    <button type="button" id="iniModalDelete" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body d-flex justify-content-center">
                    Yakin Ingin Menghapus Kategori?
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-danger" @click="deleteCat()"><i class='bx bx-trash'></i></button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Delete Kategori End -->
    
    <!-- Modal Edit Kategori -->
    <div class="modal fade" id="editKategori" tabindex="-1" aria-labelledby="exampleModalLabel" data-bs-keyboard="false" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5 text-primary text-center w-100" id="exampleModalLabel">EDIT KATEGORI</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div v-if="editedCat != null" class="modal-body">
                    <!-- Edit Kategori -->
                    <div class="row mb-3">
                        <label for="editKategori" class="col-sm-3 col-form-label">KATEGORI</label>
                        <div class="col-sm-7">
                            <input v-model="editedCat.nama_kategori" type="text" class="form-control" id="editKategori">
                        </div>
                    </div>
                    <!-- Edit Kategori End -->
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button @click="editCat()" class="btn btn-primary"><i class='bx bx-save bx-md'></i> </button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Edit End Kategori -->
    
    </template>
    
    <script>
    import Pages from '@/components/template/Pages.vue';
    import axios from 'axios';
    import Swal from 'sweetalert2';
    
    export default {
        components: {
            Pages,
        },
    
        async mounted() {
            await this.getCat();
        },
    
        data() {
            return {
                title: 'KATEGORI',
    
                isCat: false,
    
                listCat: [],
    
                editedCat: null,
    
                deleteCatId: null,
    
                categoryToDelete: null,
    
                filters: {
                    klien: true,
                    karyawan: true
                }
            }
        },
    
        computed: {
            filteredCat() {
                return this.listCat.filter(cat => {
                    if (this.filters.klien && cat.code_role === 'R1') return true;
                    if (this.filters.karyawan && cat.code_role === 'R2') return true;
                    return false;
                });
            }
        },
    
        methods: {
            async getCat() {
                try {
                    this.$root.loader = true;
                    const response = await axios.get(`http://localhost:8001/api/categories/getCat/all`);
                    this.isCat = true;
                    this.listCat = response.data.data;
                    this.applyFilter();
                } catch (error) {
                    console.error('An error occurred:', error);
                    alert('Failed to load data');
                } finally {
                    this.$root.loader = false;
                }
            },
    
            openModalDeleteCat(id) {
                this.deleteCatId = id;
                this.$root.actionModal('hapusKategori', 'show');
            },
    
            async deleteCat() {
                if (this.deleteCatId) {
                    let deleteSuccessful = false;
    
                    try {
                        this.$root.loader = true;
                        const response = await axios.delete(`http://localhost:8001/api/categories/deleteCat/${this.deleteCatId}`);
                        if (response.data.status) {
                            deleteSuccessful = true;
                            await this.getCat();
                        } else {
                            Swal.fire('Error!', 'Failed to delete category.', 'error');
                        }
                    } catch (error) {
                        console.error('An error occurred:', error);
                        Swal.fire('Error!', 'Gagal Menghapus Data.', 'error');
                    } finally {
                        this.$root.loader = false;
                        this.$root.actionModal('hapusKategori', 'hide');
                        if (deleteSuccessful) {
                            Swal.fire({
                                icon: "success",
                                title: "Successfully",
                                text: "Data Berhasil DiHAPUS",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }
                }
            },
    
            openModalEditCat(cat) {
                this.editedCat = cat;
                this.$root.actionModal('editKategori', 'show');
            },
    
            async editCat() {
                if (this.editedCat.id) {
                    let editSuccessful = false;
    
                    try {
                        this.$root.loader = true;
                        const response = await axios.put(`http://localhost:8001/api/categories/editCat/${this.editedCat.id}`, this.editedCat);
                        if (response.data.status) {
                            editSuccessful = true;
                            await this.getCat();
                        } else {
                            Swal.fire('Error!', 'Failed to edit category.', 'error');
                        }
                    } catch (error) {
                        console.error('An error occurred:', error);
                        Swal.fire('Error!', 'Gagal Mengedit Data.', 'error');
                    } finally {
                        this.$root.loader = false;
                        this.$root.actionModal('editKategori', 'hide');
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
    
            applyFilter() {
                // Filter logic is handled by computed property filteredCat
            }
        }
    }
    </script>
    
    <style scoped>
    .table th {
        background-color: #005ca1;
        color: rgb(255, 255, 255);
    }
    
    thead th {
        font-weight: bold;
        height: 65px;
        vertical-align: middle;
        border: 3px solid #005ca1;
    }
    </style>
    
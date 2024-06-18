<template>
<Pages :title="title">
    <!-- Halaman utama setelah login -->
    <div class="col-md-12">

        <div>
            <!-- Button Trigger Modal Kategori Form -->
            <button type="button" class="btn mx-4"  style="background-color: #005ca1;" @click="addCatModal=true">
                <i class='bx bxs-plus-square bx-sm' style='color:#ffffff'></i>
            </button>
            <!-- Button Trigger Modal Kategori Form End -->

            <!-- Button Trigger Modal SubKategori Form -->
            <button type="button" id="BtnTambah" class="btn"  style="background-color: #005ca1;" @click="$root.actionModal('modalForm', 'show')">
                <i class='bx bx-list-plus bx-sm' style='color:#ffffff'></i>
            </button>
            <!-- Button Trigger Modal SubKategori Form End -->
        </div>

        <hr>

        <!-- "Per-page" "Excel" & "Filter" -->
        <div class="col-md-12">
            <div class="d-flex justify-content-between mb-2 align-items-center">

                <!-- Per-page -->
                <div class="d-flex me-auto p-2 align-items-center">
                    <label for="per_page_select" class="form-label me-2">Tampilkan:</label>
                    <div class="btn-group">
                        <select class="form-select" style="min-width: 60px" aria-label="Default select example" v-model="per_page" @change="getData()">
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
                        </select>
                    </div>
                </div>
                <!-- Per-page End -->
                
                <!-- <CFormSelect size="lg" class="mb-3" aria-label="Large select example" v-model="tipe_role" @change="getData()">
                    <option value="R1">KLIEN</option>
                    <option value="R2">KARYAWAN</option>
                    <option value="R3">ALL ROLE</option>
                </CFormSelect> -->
                <!-- Button Filter -->

                <CDropdown>
                    <CDropdownToggle style="background-color: #005ca1;"><i class='bx bxs-filter-alt' style='color:#ffffff'></i></CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="tipe_role" id="flexCheckDefault" @click="getData('R1')">

                                <label class="form-check-label" for="flexCheckDefault">
                                    <i class='bx bx-buildings text-primary'> </i> KLIEN
                                </label>
                            </div>
                        </CDropdownItem>
                        <CDropdownItem>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" v-model="tipe_role" id="flexCheckDefault" @click="getData('R2')">
                                <label class="form-check-label" for="flexCheckDefault">
                                    <i class='bx bxs-user text-success'></i> KARYAWAN
                                </label>
                            </div>
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <!-- Button Filter End -->

                <!-- Excel -->
                <div class="btn-group p-2">
                    <button type="button" class="btn btn-success text-nowrap" @click="$root.actionModal('modalExcel', 'show')"><i class='bx bx-import bx-flashing-hover'> Excel</i></button>
                </div>
                <!-- Excel End -->

            </div>
        </div>
        <!-- "Per-page" "Excel" & "Filter" End -->

        <!-- Table -->
        <div style="overflow-x:auto;  background-color: #005ca1;">
            <table class="table table-striped table-hover">
                <thead class="table text-center ">
                    <tr>
                        <!-- <th scope="col">#</th> -->
                        <!-- <th scope="col">IKON</th> -->
                        <th scope="col">PRIORITAS</th>
                        <th scope="col">KATEGORI</th>
                        <th scope="col">SUB KATEGORI</th>
                        <th scope="col">DESKRIPSI JAWABAN</th>
                        <th scope="col">PIC</th>
                        <th scope="col">DIBUAT</th>
                        <th scope="col">DIUPDATE</th>
                        <th scope="col">ROLE</th>
                        <th scope="col">AKSI</th>
                    </tr>
                </thead>
                <tbody class="table">
                    <tr v-for="(subcategory, index) in items.data" :key="index">
                        <!-- <td class="text-center align-middle">{{ (items.current_page - 1) * items.per_page + index+1 }}</td> -->
                        <!-- <td class="text-center align-middle"><i class="bx-sm" :class="subcategory.icon"></i></td> -->
                        <td class="text-center align-middle">
                            <i v-if="subcategory.prioritas.toUpperCase() == 'TEXT'" class="bx bxs-envelope bx-sm bx-tada-hover text-danger"></i>
                            <i v-else-if="subcategory.prioritas.toUpperCase() == 'CALL'" class="bx bxs-phone-call bx-sm bx-tada-hover text-warning"></i>
                        </td>
                        <td class="align-middle text-nowrap ">{{ subcategory.nama_kategori }}</td>
                        <td class="align-middle text-truncate" style="max-width: 200px;">{{ subcategory.nama_subkategori }}</td>
                        <td class="align-middle text-truncate" style="max-width: 500px;">{{ subcategory.answer_text }}</td>
                        <td class="align-middle text-nowrap ">{{ subcategory.nickname }}</td>
                        <td class="text-center align-middle text-nowrap">{{ formatDateTime(subcategory.created_at) }}</td>
                        <td class="text-center align-middle text-nowrap ">{{ formatDateTime(subcategory.updated_at) }}</td>
                        <td class="text-center align-middle">
                            <i v-if="subcategory.nama_role == 'KLIEN'" class='bx bx-buildings bx-sm bx-tada-hover text-primary'></i> <!-- Tampilkan ikon building jika role adalah KLIEN -->
                            <i v-else class='bx bxs-user bx-sm bx-tada-hover text-success'></i> <!-- Tampilkan ikon user jika role adalah KARYAWAN -->
                        </td>
                        <td class="text-center align-middle">
                            <div class="d-inline-flex bd-highlight">

                                <!-- Detail Button -->
                                <!-- <button type="button" class="btn btn-success  mx-1" data-bs-toggle="modal" data-bs-target="#modalDetail">
                                    <i class='bx bx-info-circle'></i>
                                </button> -->
                                <!-- Detail Button End -->

                                <!-- Edit Button -->
                                <button type="button" class="btn btn-primary mx-1" @click="openModalEditSubCat(subcategory)">
                                    <i class='bx bx-edit'></i>
                                </button>
                                <!-- Edit Button End -->

                                <!-- Delete Button -->
                                <button type="button" class="btn btn-danger mx-1" @click="openModalDeleteSubCat(subcategory.id)">
                                    <i class='bx bx-trash'></i>
                                </button>
                                <!-- Delete Button End -->

                            </div>
                        </td>
                    </tr>
                    <tr class="text-center" v-if="items.length == 0">
                        <td colspan="9">Data tidak ditemukan</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Table end -->

        <!-- Pagination -->
        <nav v-if="items.data && calculatePages().length > 1" class="mt-2">
            <ul class="pagination">
                <li class="page-item" :class="{ 'disabled': items.current_page === 1 }">
                    <button class="page-link" @click="getData(items.current_page - 1)" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <template v-for="page in calculatePages()">
                    <li class="page-item" :class="{ 'active': page === items.current_page }">
                        <button class="page-link" @click="getData(page)">{{ page }}</button>
                    </li>
                </template>
                <li class="page-item" :class="{ 'disabled': items.current_page === items.last_page }">
                    <button class="page-link" @click="getData(items.current_page + 1)" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
        <!-- Pagination End -->

    </div>

</Pages>

<!-- Modal Tambah Kategori -->
<CModal backdrop="static" :visible="addCatModal" @close="() => { addCatModal = false }" size="lg">
    <CModalHeader>
        <CModalTitle id="StaticBackdropExampleLabel">TAMBAH KATEGORI BARU</CModalTitle>
    </CModalHeader>
    <CModalBody>

        <!-- Role -->
        <div class="row mb-3">
            <label for="prioritas" class="col-sm-3 col-form-label">ROLE</label>
            <div class="col-sm-7">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="role1" type="radio" value="R1" v-model="newDataCat.code">
                    <label class="form-check-label" for="role1">
                        <i class='bx bx-buildings bx-sm bx-tada-hover text-primary'></i> KLIEN
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="role2" type="radio" value="R2" v-model="newDataCat.code">
                    <label class="form-check-label" for="role2">
                        <i class='bx bxs-user bx-sm bx-tada-hover text-success'></i> KARYAWAN
                    </label>
                </div>
            </div>
        </div>
        <!-- Role End -->

        <!-- Kategori -->
        <div class="row mb-4">
            <label for="inputKategori" class="col-sm-3 col-form-label">KATEGORI</label>
            <div class="col-sm-7">
                <CFormInput v-model="newDataCat.name" type="text" floatingLabel="Masukkan Kategori Baru..." placeholder="Nama Kategori" for="inputKategori" />
            </div>
        </div>
        <!-- Kategori End -->

        <!-- Prioritas -->
        <div class="row mb-3">
            <label for="prioritas" class="col-sm-3 col-form-label">PRIORITAS</label>
            <div class="col-sm-7">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="prioritas1" type="radio" value="TEXT" v-model="newDataCat.prioritas">
                    <label class="form-check-label" for="prioritas1">
                        <i class='bx bxs-envelope bx-sm bx-tada-hover text-danger'></i> PESAN
                    </label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" id="prioritas2" type="radio" value="CALL" v-model="newDataCat.prioritas">
                    <label class="form-check-label" for="prioritas2">
                        <i class='bx bxs-phone-call bx-sm bx-tada-hover text-warning'></i> CALL
                    </label>
                </div>
            </div>
        </div>
        <!-- Prioritas End -->

        <!-- IKON -->
        <div class="row mb-3">
            <label for="inputIkon" class="col-sm-3 col-form-label">IKON</label>
            <div class="col-sm-7">
                <div class="input-group mb-3">
                    <input type="text" v-model="newDataCat.selectIcon" class="form-control" placeholder="Pilih Icon FAQ..." readonly>
                    <button type="button" class="btn btn-secondary input-group-text" @click="$root.actionModal('modalShowIcons', 'show')">
                        <i class='bx bx-search-alt'></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- IKON END -->

    </CModalBody>

    <div class="modal-footer d-flex justify-content-center">
        <Button class="btn btn-primary" @click="newCat()"><i class='bx bx-save bx-md'></i></Button>
    </div>
</CModal>
<!-- Modal Tambah Kategori Form End-->

<!-- Modal Tambah SubKategori, dll Form -->
<div class="modal fade" id="modalForm" tabindex="-1" aria-labelledby="modalForm" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">TAMBAH DATA</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">

                <form @submit.prevent="postData()">

                    <!-- Kategori -->
                    <div class="row mb-3">
                        <label for="pilihKategori" class="col-sm-3 col-form-label">KATEGORI</label>
                        <div class="col-sm-7">
                            <select v-model="kategori.idCat" class="form-select form-select-sm" aria-label="Small select example" id="pilihKategori">
                                <option value="" disabled selected>Pilih Kategori...</option>
                                <option v-for="(input, key) in listCat" :key="key" :value="input.code_kategori">{{ input.nama_kategori }}</option>
                            </select>
                        </div>
                    </div>
                    <!-- Kategori End -->

                    <div v-for="(input, k) in formSubkategori" :key="k">
                        <!-- <hr style="border: 2px solid;"> -->

                        <!-- Sub Kategori -->
                        <div class="row mb-3">
                            <label for="inputSubKategori" class="col-sm-3 col-form-label">SUB KATEGORI</label>
                            <div class="col-sm-7">
                                <input v-model="input.nama_subkategori" type="text" class="form-control" id="inputSubKategori" placeholder="Masukkan Sub Kategori...">
                            </div>
                        </div>
                        <!-- Sub Kategori End -->

                        <!-- Deskripsi Jawaban -->
                        <div class="row mb-3">
                            <label class="col-sm-3 col-form-label">DESKRIPSI JAWABAN</label>
                            <div class="col-sm-7">
                                <div v-for="(answer, indAnswer) in input.answer_text" :key="indAnswer">
                                    <div class="row mb-3">
                                        <div class="col-sm-12">
                                            <textarea v-model="answer.text" class="form-control" :placeholder="`Masukkan Deskripsi Jawaban ${indAnswer + 1}`" rows="2"></textarea>
                                        </div>
                                        <div class="col-sm-12 mt-2">
                                            <button type="button" class="btn btn-danger btn-sm me-2" @click="hapusJawaban(indAnswer, input.answer_text)" v-if="input.answer_text.length > 1"><i class='bx bx-minus'></i></button>
                                            <button type="button" class="btn btn-success btn-sm" @click="tambahJawaban(input)" v-if="input.answer_text.length - 1 === indAnswer"><i class='bx bx-plus'></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Deskripsi Jawaban End -->

                        <!-- PIC -->
                        <div class="row mb-3">
                            <label for="inputPic" class="col-sm-3 col-form-label">PIC</label>
                            <div class="col-sm-7">
                                <select v-model="input.pic_id" class="form-select form-select-sm" aria-label="Small select example" id="inputPic">
                                    <option value="" disabled selected>Pilih PIC...</option>
                                    <option v-for="(input, key) in pics" :key="key" :value="input.id">{{ input.nama }}</option>
                                </select>
                            </div>
                            <!-- PIC End -->

                            <!-- +- -->
                            <div class="col-sm-2 d-flex align-items-center">
                                <button type="button" class="btn btn-danger me-2" @click="removeForm(k)" v-if="formSubkategori.length > 1"><i class='bx bxs-checkbox-minus bx-sm'></i></button>
                                <button type="button" class="btn btn-success" @click="addForm(k)" v-if="k === formSubkategori.length - 1"><i class='bx bxs-plus-square bx-sm'></i></button>
                            </div>
                            <!-- +- End -->

                        </div>
                    </div>

                    <!-- Simpan -->
                    <div class="modal-footer d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary" value="Simpan"><i class='bx bx-save bx-lg'></i></button>
                    </div>
                    <!-- Simpan End -->

                </form>
            </div>
        </div>
    </div>
</div>
<!-- Modal Tambah SubKategori, DLL Form End-->

<!-- Modal Hapus SubKategori, DLL -->
<div class="modal fade" id="hapusSubKategori" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-danger text-center w-100" id="staticBackdropLabel">Delete</h1>
                <button type="button" id="iniModalDelete" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex justify-content-center">
                Yakin Ingin Menghapus Sub Kategori?
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn btn-danger" @click="deleteData()"><i class='bx bx-trash'></i></button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Hapus SubKategori, DLL End -->

<!-- Modal Edit Form -->
<div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-scrollable modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary" id="exampleModalLabel">EDIT</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div v-if="editedSubCat != null" class="modal-body">
                <!-- Edit Kategori -->
                <div class="row mb-3">
                    <label for="editSubKategori" class="col-sm-3 col-form-label">KATEGORI</label>
                    <div class="col-sm-7">
                        <input v-model="editedSubCat.nama_kategori" type="text" class="form-control" id="editSubKategori" readonly>
                    </div>
                </div>
                <!-- Edit Kategori End -->

                <!-- Edit Sub Kategori -->
                <div class="row mb-3">
                    <label for="editSubKategori" class="col-sm-3 col-form-label">SUB KATEGORI</label>
                    <div class="col-sm-7">
                        <input v-model="editedSubCat.nama_subkategori" type="text" class="form-control" id="editSubKategori">
                    </div>
                </div>
                <!-- Edit Sub Kategori End -->

                <!-- Edit Deskripsi Jawaban -->
                <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">DESKRIPSI JAWABAN</label>
                    <div class="col-sm-7">
                        <div>
                            <div class="row mb-3">
                                <div class="col-sm-12">
                                    <textarea v-model="editedSubCat.answer_text" class="form-control" :placeholder="`Masukkan Deskripsi Jawaban ${indAnswer + 1}`" rows="8"></textarea>
                                </div>
                                <!-- <div class="col-sm-12 mt-2">
                                        <button type="button" class="btn btn-danger btn-sm me-2" ><i class='bx bx-minus'></i></button>
                                        <button type="button" class="btn btn-success btn-sm" ><i class='bx bx-plus'></i></button>
                                    </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Edit Deskripsi Jawaban End -->

                <!-- Edit PIC -->
                <div class="row mb-3">
                    <label class="col-sm-3 col-form-label">PIC</label>
                    <div class="col-sm-7">
                        <select v-model="editedSubCat.users_id" class="form-select" aria-label="Default select example">
                            <option v-for="(input, key) in pics" :key="key" :value="input.id">{{ input.nama }}</option>
                        </select>
                    </div>
                </div>
                <!-- Edit PIC End -->

                <!-- Simpan Edit -->
                <div class="modal-footer d-flex justify-content-center">
                    <button @click="editData()" type="submit" class="btn btn-primary"><i class='bx bx-save bx-md'></i></button>
                </div>
                <!-- Simpan Edit End -->

            </div>
        </div>
    </div>
</div>
<!-- Modal Edit Form End -->

<!-- Modal Excel -->
<div class="modal fade" id="modalExcel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-success" id="exampleModalLabel">UPLOAD FAQ</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="border border-success mx-auto p-4 mb-3 " style="max-height:50vh; overflow-y: auto">
                    <h5>SYARAT & KETENTUAN</h5>
                    <ol>
                        <li>PASTIKAN ISI TERLEBIH DAHULU KATEGORI</li>
                        <li>TIDAK MENCANTUMKAN NAMA COLOMN "HEADER" DIBAGIAN ATAS</li>
                        <li>PASTIKAN HANYA TERDAPAT 1 SHEET PADA FILE</li>
                        <li>URUTAN DATA => <b>*KODE KATEGORI, *PERTANYAAN, *JAWABAN, *PIC(ID)</b></li>
                        <li>UNTUK PENGISIAN <b>DESKRIPSI JAWABAN</b> TAMBAHKAN <b>";"</b> TANPA SPASI SEBAGAI PEMISAH URUTAN JAWABAN.
                            <dd><b>EXP: 1. JAWABAN PERTAMA;2. JAWABAN KEDUA;3. DAN SETERUSNYA...</b></dd>
                        </li>
                        <li>COLOMN DENGAN TANDA <b>*</b> WAJIB UNTUK DIISI</li>
                        <li>FORMAT UNTUK PENGISIAN <b>KATEGORI</b> MENGGUNAKAN <b>KODE K1/K2...</b>DIMANA KODE KATEGORI MERUPAKAN KATEGORI YANG SUDAH DISI SEBELUMNYA</li>
                        <ul>
                            <li v-for="(item, index) in listCat">{{ item.code_kategori }} = {{ item.nama_kategori }}</li>
                        </ul>
                        <li>FORMAT UNTUK PENGISIAN <b>PIC</b> MENGGUNAKAN ID 1/2/3...
                            <ul>
                                <li v-for="(item, index) in pics">{{ item.id }} = {{ item.nama }}</li>
                            </ul>
                        </li>
                    </ol>
                </div>
                <div class="mb-4">
                    <p>NOTE: PASTIKAN SEMUA SYARAT SUDAH SESUAI! LIHAT CONTOH FORMAT <a href="javascript:void(0)" @click="$root.actionModal('gambarModal', 'show')">DISINI</a> </p>
                </div>
                <div class="input-group mb-3">
                    <input type="file" class="form-control" ref="inputGroupFile02">
                </div>
            </div>
            <div class="modal-footer justify-content-end">
                <button type="button" class="btn btn-success" @click="uploadExcelFile()"><i class='bx bx-import bx-sm bx-flashing-hover'></i></button>
            </div>
        </div>
    </div>
</div>
<!-- Modal Excel End -->

<!-- Modal Icon -->
<div class="modal fade" id="modalShowIcons" tabindex="-1" aria-labelledby="modalShowIconsLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">ICON FAQ</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row g-3">
                    <div class="col-md-2" v-for="icon in dataIcons" :key="icon.name">
                        <div class="card">
                            <div class="card-header text-center" style="cursor: pointer" @click="selectIcon(icon)">
                                <i v-if="icon.type_of_icon == 'REGULAR'" class="fs-3 bx " :class="`bx-${icon.name}`"></i>
                                <i v-else-if="icon.type_of_icon == 'SOLID'" class="fs-3 bx " :class="`bxs-${icon.name}`"></i>
                                <i v-else-if="icon.type_of_icon == 'LOGO'" class="fs-3 bx " :class="`bxl-${icon.name}`"></i>
                                <p class="m-0 text-truncate">{{ icon.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Modal Icon End -->

<!-- Modal Format Gambar Excel -->
<div class="modal fade" id="gambarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-success">FORMAT EXCEL</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img src="../../../assets/img/Contoh_Format.jpg" class="img-fluid" alt="Contoh Format">
            </div>
        </div>
    </div>
</div>
<!-- Modal Format Gambar Excel End -->
</template>

<script>
import Pages from '@/components/template/Pages.vue';
import axios from 'axios';
import * as XLSX from 'xlsx';
import Swal from 'sweetalert2'

export default {

    components: {
        Pages,
    },

    async mounted() {
        await this.getData();

        // await this.getRoles();

        await this.getAllPic();

        await this.loadIcon();

        await this.getCat();
    },

    data() {
        return {
            title: 'FAQ',

            roles: [{
                    nama_role: 'KLIEN',
                    code_role: 'R1'
                },
                {
                    nama_role: 'KARYAWAN',
                    code_role: 'R2'
                }
            ],

            addCatModal: false,

            pics: [],

            items: [],

            dataIcons: [],

            selectedFilter: [],

            kategori: {
                role: "",
                idCat: "",
                prioritas: "",
                selectIcon: ""
            },

            formSubkategori: [{
                nama_subkategori: "",
                answer_text: [{
                    text: ""
                }],
                pic_id: "",
            }],

            editedSubCat: null,

            idCategory: null,

            isLoaded: false,

            newDataCat: {
                name: null,
                code: null,
                selectIcon: "",
                prioritas: null
            },

            deleteSubCatId: null,

            tipe_role: null,

            isCat: false,

            listCat: null,

            per_page: 9,

            modal: {
                visible: false
            },

        }
    },

    methods: {

        // async getRoles() {
        //     try {
        //         const response = await axios.get(`http://localhost:8001/api/MasterRole/getData`);
        //         if (response.data.status) {
        //             this.roles = response.data.data; // Atur data yang diterima ke properti roles
        //             console.log(this.roles)
        //         }
        //     } catch (error) {
        //         console.error('An error occurred:', error);
        //         alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
        //     } finally {}
        // },

        async getAllPic() {
            try {
                const response = await axios.get(`http://localhost:8001/api/AllPic/getAllPic`);
                this.pics = response.data.data; // Atur data yang diterima ke properti roles
                console.log(this.pics);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
            } finally {}
        },

        async newCat() {
            try {
                this.$root.loader = true;
                if (this.newDataCat.name && this.newDataCat.code && this.newDataCat.selectIcon && this.newDataCat.prioritas) {
                    await axios.post(`http://localhost:8001/api/categories/newCat`, this.newDataCat);
                    await this.getCat();
                    Swal.fire({
                        icon: "success",
                        title: "Successfully",
                        text: "Kategori Berhasil Di Tambah",
                        showConfirmButton: false,
                        timer: 1500
                    });
                } else {
                    alert('Data tidak lengkap');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
            } finally {
                this.$root.loader = false;
                this.addCatModal = false;

            }
        },

        async getData(page = 1) {
            try {
                this.$root.loader = true;
                const response = await axios.get(`http://localhost:8001/api/categories/getData`, {
                    params: {
                        page: page,
                        per_page: this.per_page,
                        tipe: this.tipe_role
                    }
                });
                if (response.data.status) {
                    this.items = response.data.data; // Set data subkategori dari respons ke properti formSubkategori
                    console.log(this.items);
                    this.isLoaded = true;
                }
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
            } finally {
                this.$root.loader = false;

            }
        },

        async getCat() {
            try {
                const code_role = 'all';
                const response = await axios.get(`http://localhost:8001/api/categories/getCat/` + code_role);
                this.isCat = true;
                this.listCat = response.data.data;
                console.log(this.listCat);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data'); // Tampilkan pesan kesalahan jika gagal mengambil data
            }
        },

        async postData() {
            try {
                this.$root.loader = true;
                const selectedRole = this.kategori.role;

                const sliceDataKategori = this.formSubkategori.slice();
                const dataFormKategori = sliceDataKategori.map(x => {
                    const trimmedAnswers = x.answer_text.map((ans, idx) => {
                        return ans.text.trim();
                    }).join(';');

                    const newObj = {
                        nama_subkategori: x.nama_subkategori,
                        answer_text: trimmedAnswers,
                        pic_id: x.pic_id,
                    }
                    return newObj;
                });

                const postData = {
                    code_role: selectedRole,
                    idCat: this.kategori.idCat,
                    icon: this.kategori.selectIcon,
                    prioritas: this.kategori.prioritas,
                    formSubkategori: dataFormKategori
                };
                console.log(postData)
                const response = await axios.post(`http://localhost:8001/api/categories/postData`, postData);

                console.log(response.data);
                if (response.data.status) {

                    this.getData();
                    this.kategori = {
                        role: "",
                        idCat: "",
                        prioritas: "",
                        selectIcon: ""
                    };
                    this.formSubkategori = [{
                        nama_subkategori: "",
                        answer_text: "",
                        pic_id: ""
                    }];
                    // Tutup modal form tambah
                    this.$root.actionModal('modalForm', 'hide');
                }
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'Gagal Menghapus Data.', 'error');
            } finally {
                this.modal.visible = false;
                this.$root.loader = false;
                Swal.fire({
                    icon: "success",
                    title: "Successfully",
                    text: "Data Berhasil Di Tambah",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },

        tambahJawaban(input) {
            const newobj = {
                text: ""
            };

            input.answer_text.push(newobj);
        },

        hapusJawaban(idx, ansList) {
            ansList.splice(idx, 1);
        },

        openModalDeleteSubCat(id) {
            this.deleteSubCatId = id;
            this.$root.actionModal('hapusSubKategori', 'show');
        },

        async deleteData() {
            if (this.deleteSubCatId) {
                let deleteSuccessful = false;

                try {
                    this.$root.loader = true;
                    const response = await axios.delete(`http://localhost:8001/api/categories/deleteData/${this.deleteSubCatId}`);
                    if (response.data.status) {
                        deleteSuccessful = true;

                        await this.getData(); 
                    } else {
                        Swal.fire('Error!', 'Failed to delete sub category.', 'error');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    Swal.fire('Error!', 'Gagal Menghapus Data.', 'error');
                } finally {
                    this.$root.loader = false;
                    this.$root.actionModal('hapusSubKategori', 'hide');
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

        openModalEditSubCat(subcategory) {
            this.editedSubCat = subcategory;
            console.log(subcategory);
            this.$root.actionModal('editModal', 'show');
        },

        async editData() {
            if (this.editedSubCat.id) {
                let editSuccessful = false;

                try {
                    this.$root.loader = true;
                    const response = await axios.put(`http://localhost:8001/api/categories/editData/${this.editedSubCat.id}`, this.editedSubCat);
                    if (response.data.status) {
                        editSuccessful = true;

                        await this.getData();
                    } else {
                        Swal.fire('Error!', 'Failed to edit category.', 'error');
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                    Swal.fire('Error!', 'Gagal Mengedit Data.', 'error');
                } finally {
                    this.$root.loader = false;
                    // this.modal.visible = false;
                    this.$root.actionModal('editModal', 'hide');

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

        addForm() {
            this.formSubkategori.push({
                nama_subkategori: "",
                answer_text: [{
                    text: ""
                }],
                pic_id: ""
            });
        },

        removeForm(index) {
            this.formSubkategori.splice(index, 1);
        },

        async loadIcon() {
            try {
                const request = await this.$axios({
                    method: 'get',
                    url: 'https://boxicons.com/_next/data/DNHfRjsQaNmPABrOMCg7E/index.json',
                });

                const reqData = request.data.pageProps.icons;
                this.dataIcons = reqData;
                console.log(reqData);
            } catch (error) {
                console.log(error);
            }
        },

        selectIcon(icon) {
            let iconType = '';
            if (icon.type_of_icon === 'REGULAR') {
                iconType = 'bx-';
            } else if (icon.type_of_icon === 'SOLID') {
                iconType = 'bxs-';
            } else if (icon.type_of_icon === 'LOGO') {
                iconType = 'bxl-';
            }

            this.newDataCat.selectIcon = `bx ${iconType}${icon.name}`;
            this.$root.actionModal('modalShowIcons', 'hide');
        },

        uploadFileIconToPublic() {
            const fileInput = this.$refs.fileInputIcon;
            const file = fileInput.files[0];

            if (!file) {
                console.error('No file selected');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            }).then(data => {
                console.log('File uploaded successfully:', data);
            }).catch(error => {
                console.error('Error uploading file:', error);
            });
        },

        calculatePages() {
            const startPage = Math.max(1, this.items.current_page - 4);
            const endPage = Math.min(startPage + 8, this.items.last_page);

            return Array.from({
                    length: endPage - startPage + 1,
                },
                (_, i) => startPage + i
            );
        },

        formatDateTime(dateTimeString) {
            const date = new Date(dateTimeString);
            const year = date.getFullYear().toString().slice(-2); // Mengambil dua digit terakhir tahun
            const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mendapatkan bulan dalam format dua digit
            const day = date.getDate().toString().padStart(2, '0'); // Mendapatkan tanggal dalam format dua digit
            return `${day}/${month}/${year}`;
        },

        readExcelFileAsync(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {
                        type: 'array'
                    });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const dataExcel = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1
                    });
                    resolve(dataExcel);
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsArrayBuffer(file);
            });
        },

        async uploadExcelFile() {
            this.$root.loader = true;
            const inputExcel = this.$refs.inputGroupFile02;
            const excelVal = inputExcel.files[0];

            const excelRows = await this.readExcelFileAsync(excelVal);

            try {
                const response = await axios.post('http://localhost:8001/api/categories/uploadExcel', {
                    excelRows: excelRows
                }); 
                console.log(response.data); // Tampilkan respon dari server jika perlu

                await this.getData();
                this.$root.actionModal('modalExcel', 'hide');
            } catch (error) {
                console.error('Error uploading file:', error);
            }
            this.$root.loader = false;
        },

    }
}
</script>

<style scoped>
.align-items-center .btn-group {
    margin-left: 8px;
}

.form-check-inline {
    margin-left: 10px;
    margin-right: 40px;
}

.dropdown-toggle-no-caret::after {
    display: none;
}

textarea {
    height: auto;
    min-height: 100px;
    overflow-y: auto;
}

.table th {
    background-color: var(--vt-color-step-1000);
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

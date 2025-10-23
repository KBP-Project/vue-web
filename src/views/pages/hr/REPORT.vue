<template>
<Pages :title="title">
    <!-- Halaman utama setelah login -->
    <div class="col-md-12">

      <!-- "Per-page" & "Filter" -->
<div class="col-md-12">
    <div class="d-flex justify-content-between mb-3 align-items-center flex-wrap">

        <!-- Per-page -->
        <div class="d-flex align-items-center">
            <label for="per_page_select" class="form-label me-2 mb-0">Tampilkan:</label>
            <select class="form-select" style="height: 42px;" aria-label="Per Page">
                <option value="9">9</option>
                <option value="18">18</option>
                <option value="27">27</option>
            </select>
        </div>
        <!-- Per-page End -->

        <!-- Filter Tanggal -->
        <div class="d-flex align-items-center col-lg-6">
            <input type="date" class="form-control me-2" style="height: 42px;" v-model="filterDateStart">
            <span class="me-2">S/D</span>
            <input type="date" class="form-control me-2" style="height: 42px;" v-model="filterDateEnd">
            <button class="btn px-3 py-2" style="background-color: #005ca1; color: #ffffff;">
                Filter
            </button>
        </div>
        <!-- Filter Tanggal End -->

    </div>
</div>
<!-- "Per-page" & "Filter" End -->



        <!-- Table -->
        <div style="overflow-x:auto;  background-color: #005ca1;">
            <table class="table table-striped table-hover">
                <thead class="table">
                    <tr>
                        <th class="text-center" scope="col" style="width: 30px;">#</th>
                        <th class="text-center" scope="col" style="width: 0px;">TANGGAL</th>
                        <th class="text-center" scope="col" style="width: 50px;">ROLE</th>
                        <th scope="col" style="width: 150px;">NAMA</th>
                        <th scope="col" style="width: 150px;">PERUSAHAAN</th>
                        <th scope="col" style="width: 100px;">RATING</th>
                        <th scope="col" style="width: 300px;">FEEDBACK</th>
                    </tr>
                </thead>
                <tbody class="table">
                    <tr v-for="(rat, index) in filteredRatings" :key="index" @click="openDetailRatings(rat)">
                        <td class="text-center align-middle">{{ index + 1 }}</td>
                        <td class="text-center align-middle">{{ formatDateTime(rat.created_at) }}</td>
                        <td class="text-center align-middle">
                            <i v-if="rat.nama_role == 'KLIEN'" class='bx bx-buildings bx-sm bx-tada-hover text-primary'></i>
                            <i v-else class='bx bxs-user bx-sm bx-tada-hover text-success'></i>
                        </td>
                        <td class="align-middle">{{ rat.nama }}</td>
                        <td class="align-middle text-truncate" style="max-width: 110px;">{{ rat.customer_name }}</td>
                        <td class="align-middle">
                            <div class="mr-0">
                                <i v-for="rat_val in rat.rating_value" class='bx bxs-star bx-sm bx-tada-hover text-warning'></i>
                            </div>
                        </td>
                        <td class="align-middle text-truncate" style="max-width: 150px;">{{ rat.pesan_feedback.toUpperCase() }}</td>
                    </tr>
                    <tr class="text-center" v-if="filteredRatings.length == 0">
                        <td colspan="7">Data tidak ditemukan</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- Table end -->

        <!-- Pagination -->
        <nav class="mt-2">
                <ul class="pagination">
                    <!-- Tombol Previous -->
                    <li class="page-item disabled">
                        <button class="page-link">
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>

                    <!-- Nomor Halaman -->
                    <li class="page-item active"><button class="page-link">1</button></li>
                    <li class="page-item"><button class="page-link">2</button></li>

                    <!-- Tombol Next -->
                    <li class="page-item">
                        <button class="page-link">
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <!-- Pagination End -->

    </div>
</Pages>

<!-- Modal Detail -->
<div class="modal fade" id="modalDetail" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable ">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5 text-primary" id="exampleModalLabel">DETAIL</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form action="prevent.default" v-if="detailRatings != null">
                    <div class="form-group ">
                        <div class="row mb-4">
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label" for="tes">TANGGAL</label>
                                <input v-model="detailRatings.created_at" type="text" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label" for="tes">ROLE</label>
                                <div class="role-input-wrapper">
                                    <input type="text" class="form-control role-input" readonly>
                                    <div class="role-icon">
                                        <i v-if="detailRatings.code_role === 'R1'" class="bx bx-buildings bx-sm bx-tada-hover text-primary"></i>
                                        <i v-else class="bx bxs-user bx-sm bx-tada-hover text-success"></i>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label " for="tes">NAMA</label>
                                <input v-model="detailRatings.nama" type="text" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label " for="tes">PT</label>
                                <input v-model="detailRatings.customer_name" type="text" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label " for="tes">KATEGORI</label>
                                <input v-model="detailRatings.nama_kategori" type="text" class="form-control" readonly>
                            </div>
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label" for="tes">SUB KATEGORI</label>
                                <input v-model="detailRatings.nama_subkategori" type="text" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label" for="tes">RATING</label>
                                <div class="rating-input-wrapper">
                                    <input type="text" class="form-control rating-input" readonly>
                                    <div class="rating-icons">
                                        <i v-for="n in parseInt(detailRatings.rating_value)" :key="n" class="bx bxs-star bx-sm bx-tada-hover text-warning"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 ms-auto">
                                <label class="bold-label" for="tes">PIC</label>
                                <input v-model="detailRatings.nama_pic" type="text" class="form-control" readonly>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="ms-auto">
                                <label class="bold-label" for="tes">FEEDBACK</label>
                                <textarea v-model="detailRatings.pesan_feedback" class="form-control uppercase-text" readonly rows="4"></textarea>
                            </div>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    </div>
</div>
<!-- Modal Detail End -->
</template>

    
    
<script>
import Pages from '@/components/template/Pages.vue';
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    components: {
        Pages,
    },
    mounted() {},
    data() {
        return {
            title: 'REPORT',
            data: null,
            ratings: [],
            detailRatings: null,
            filters: {
                KLIEN: true,
                KARYAWAN: true,
            }
        }
    },
    mounted() {
        this.getData();
    },
    computed: {
        filteredRatings() {
            return this.ratings.filter(rating => {
                if (this.filters.KLIEN && rating.nama_role === 'KLIEN') return true;
                if (this.filters.KARYAWAN && rating.nama_role === 'KARYAWAN') return true;
                return false;
            });
        }
    },
    methods: {
        openDetailRatings(rat) {
            this.detailRatings = rat;
            console.log(rat);
            this.$root.actionModal('modalDetail', 'show');
        },
        async getData() {
            try {
                this.$root.loader = true;
                const response = await axios.get(`http://localhost:8001/api/Ratings/getRating`);
                this.ratings = response.data.data;
                console.log(this.ratings);
            } catch (error) {
                console.error('An error occurred:', error);
                alert('Failed to load data');
            } finally {
                this.$root.loader = false;
            }
        },
        formatDateTime(dateTimeString) {
            const date = new Date(dateTimeString);
            const year = date.getFullYear().toString().slice(-2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${day}/${month}/${year}`;
        },
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

.rating-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.rating-input {
    padding-left: 50px;
}

.rating-icons {
    position: absolute;
    left: 10px;
    display: flex;
    gap: 2px;
}

.role-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.role-input {
    padding-left: 30px;
}

.role-icon {
    position: absolute;
    left: 10px;
    display: flex;
    align-items: center;
    pointer-events: none;
}

.uppercase-text {
    text-transform: uppercase;
}

.bold-label {
    font-weight: bold;
}
</style>

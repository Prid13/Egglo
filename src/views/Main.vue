<template>
    <div class="container-fluid">
        <div class="row min-vh-100">
            <div class="col-12">

                <div style="position: absolute; top: 10px; right: 20px;">🌍 Zain 2021</div>

                <div class="row vh-10 d-flex flex-row align-items-center justify-content-between ps-5 pt-2">
                    <h3 class="title col-12 text-start d-flex align-items-center">Egglo <img src="../assets/Egglo-Logo-v4.png" class="logo"></h3>
                </div>

                <div
                    class="row min-vh-75 d-flex flex-column align-items-center"
                    :class="[resultsShown ? 'justify-content-start' : 'justify-content-center']">

                    <div class="col-12 w-50 d-flex flex-column justify-content-center mb-5">
                        <div class="input-group shadow-sm search-container">
                            <input
                                class="form-control form-control-lg search-input p-3"
                                type="text"
                                placeholder="Søk navn eller org.nr..."
                                ref="search_input"
                                @keyup="handleQuery">

                            <div class="input-group-append">
                                <button class="input-group-text search-button h-100 px-3">
                                    <i data-feather="search"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <transition name="fade">
                        <div v-show="resultsShown" class="col-8">
                            <Table
                                :headers="tableHeaders"
                                :data="results"
                                :show-index="true"
                                :clickable="true"
                                @onClick="openModal" />
                        </div>
                    </transition>

                </div>

            </div>
        </div>
    </div>
    
    <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:header>
            <h4>{{ modalData.navn }}</h4>
        </template>
        <template v-slot:body>
            <table class="table table-borderless text-start modal-table">
                <tbody>
                    <tr>
                        <th>Navn</th>
                        <td>{{ modalData.navn }}</td>
                    </tr>
                    <tr>
                        <th>Organisasjonnr.</th>
                        <td>{{ modalData.organisasjonsnummer }}</td>
                    </tr>
                    <tr>
                        <th>Stiftelsesdato</th>
                        <td>{{ modalData.stiftelsesdato }}</td>
                    </tr>
                    <tr>
                        <th>Konkurs?</th>
                        <td>
                            <span class="konkurs d-flex justify-content-start">
                                {{ modalData.konkurs ? 'Ja' : 'Nei' }}
                                <img src="../assets/cracked-egg.png" v-if="modalData.konkurs">
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Hjemmeside</th>
                        <td>
                            <a :href="modalData.hjemmeside" v-if="modalData.hjemmeside" target="_blank">
                                {{ modalData.hjemmeside }}
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </template>
    </Modal>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Table from '@/components/Table';
import Modal from '@/components/Modal';

export default {
    data() {
        return {
            resultsShown: false,
            showModal: false,
            modalData: {},
            results: [],
            tableHeaders: [
                {
                    label: 'Navn',
                    key: 'navn',
                    width: '50%'
                },
                {
                    label: 'Stiftelsesdato',
                    key: 'stiftelsesdato',
                    width: '40%',
                },
                {
                    label: '',
                    key: 'konkurs',
                    width: '10%'
                }
            ]
        }
    },
    setup(props) {
        const search_input = ref();
        const modal = ref();

        onMounted(() => {
            search_input.value.focus();
        });

        return {
            search_input,
            modal
        }
    },
    methods: {
        handleQuery(event) {
            const value = event.target.value;

            if(value.length >= 3){
                this.resultsShown = true;
                this.fetchResults();
            } else {
                this.resultsShown = false;
            }
        },
        fetchResults() {
            const search_query = this.search_input.value;

            const orgnr = /^\d{9}$/;

            if(orgnr.test(search_query)){
                axios.get("https://data.brreg.no/enhetsregisteret/api/enheter/" + search_query)
                    .then(res => {
                        if(res)
                            this.results = [res.data];
                        else
                            this.results = [];
                    })
                    .catch(error => {
                        console.log(error)
                        // Manage errors if found any
                    })
            } else {
                axios.get("https://data.brreg.no/enhetsregisteret/api/enheter", {
                    params: { navn: this.search_input.value }
                })
                    .then(res => {
                        if(res.data._embedded)
                            this.results = res.data._embedded.enheter;
                        else
                            this.results = [];
                    })
                    .catch(error => {
                        console.log(error)
                        // Manage errors if found any
                    });
            }
        },
        openModal(row) {
            this.modalData = row;
            this.showModal = true;
        }
    },
    components: {
        Table,
        Modal
    }
}
</script>

<style>
.title {
    color: rgb(0 140 239);
    font-family: 'Dosis';
    font-size: 2em;
    font-weight: 800;
    text-transform: uppercase;
    text-shadow: 10px;
    border-left: 5px solid rgb(255, 196, 0);
}

.logo {
    height: 60px;
    margin-left: 15px;
}

.search-input {
    border: none;
    border-bottom: 5px solid rgb(233, 236, 243);
}
.search-input:focus {
    outline: none;
    box-shadow: none;
}
.search-input:focus + .input-group-append {
    border-bottom-color: #86b7fe;
}
.search-input::placeholder {
    font-style: italic;
}

.input-group-append {
    border-bottom: 5px solid rgb(233, 236, 243);
    transition: border-color .15s ease-in-out;
}
.search-button {
    background-color: white;
    border: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}

.modal-table th {
    width: 30%;
}

.konkurs img {
    height: 25px;
}

.fade-enter-active {
    transition: opacity 300ms ease;
}
.fade-leave-active {
    transition: opacity 50ms ease;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
<template>
    <table class="table table-light table-striped table-hover shadow text-start">
        <thead class="table-primary">
            <tr>
                <th v-if="showIndex" scope="col" class="px-3">#</th>
                <th v-for="(header, index) in headers" :key="index" scope="col" :style="{ width: header.width }">
                    {{ header.label }}
                </th>
                <th v-if="clickable"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in data" :key="row.organisasjonsnummer" @click="$emit('onClick', row)">
                <th v-if="showIndex" scope="row">{{ index+1 }}</th>
                <td v-for="(header, index) in headers" :key="index">
                    <span v-if="header.key !== 'konkurs'">
                        {{ row[header.key] }}
                    </span>
                    <span v-else class="konkurs d-flex justify-content-start">
                        {{ row[header.key] ? 'Konkurs' : ''}}
                        <img src="../assets/cracked-egg.png" v-if="row[header.key]">
                    </span>
                </td>
                <td v-if="clickable" class="px-3"><i data-feather="info" class="icon"></i></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { onUpdated } from 'vue';
export default {
    props: {
        'headers': {
            type: Object
        },
        'data': {
            type: Array
        },
        'showIndex': {
            type: Boolean,
            default: false
        },
        'clickable': {
            type: Boolean,
            default: false
        }
    },
    setup() {
        onUpdated(() => {
            feather.replace();
        });
    }
}
</script>

<style scoped>
.table {
    border-radius: 10px;
}
th[scope=col]:first-child, th[scope=row] {
    text-align: center;
}

thead th:first-child {
    border-top-left-radius: 10px;
}
thead th:last-child {
    border-top-right-radius: 10px;
}

tbody tr {
    cursor: pointer;
}

.icon {
    color: #0066ff;
}
.konkurs {
    color: red;
}
.konkurs img {
    height: 25px;
}

.table-primary {
    --bs-table-bg: #0066ff;
    color: rgb(255, 255, 255);
}
</style>
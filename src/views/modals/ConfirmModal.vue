<template>
    <div class="modal">
        <div class="modal-body center">
        Anda yakin memprosesnya?
        </div>
        <div class="modal-action center">
            <Button type="button" color="success" @click="$emit('return',true)">Proses</Button>&nbsp;
            <Button type="button" @click="$emit('return',false)">Batal</Button>
        </div>
    </div>
</template>

<script>
import forms from "@/components/forms/index";
export default {
    props: {
        params: {
            type: Object,
            default: () => {}
        }
    },
    components: {
        Button: forms.Button
    }
}
</script>

<style scoped>
.modal {
    background: var(--bg-white);
    color: var(--black-600);
    min-width: 320px;
    width: 320px;
    max-width: 320px;
    padding: 1rem;
    border-radius: 0.6rem;
}
</style>
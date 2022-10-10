<template>
    <div class="wrap">
        <div class="header">
            <div class="profile">
                <img alt="ai" src="../assets/profile2.jpg">
                <P class="name">THEA VANNAK</P>
            </div>
        
        </div>
    </div>
</template>

<script lang="ts">
export default {
  name: "HeaderBlock",
};
</script>

<style scoped lang="scss">
.header{
    padding: 20px 20px 0 20px;
    position: relative;
    border: 1px solid #ccc;
    border-bottom: 0;
}
.profile{
    display: flex;
    justify-content: left;
}
.profile img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 20px;
}
.name{
    display: flex;
    align-items: center;
}
.search {
    position: absolute;
    right: 20px;
    top: 25px;
}
.search-txt{
    width: 210px;
    padding: 10px 10px;
}
</style>
<template>
  <div class="home container">
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
      been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
      galley of type and scrambled it to make a type specimen book. It has survived not only five
      centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
    </p>
    <p>
      It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
      passages, and more recently with desktop publishing software like Aldus PageMaker including
      versions of Lorem Ipsum.
    </p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
};
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 150px;

  @media screen and (min-width: 1000px) {
    height: 100%;
    min-height: 100vh;
  }
}

p {
  padding: 0 59px;
  margin: auto;
  font-size: 16px;
  text-align: left;
  line-height: 160%;
  font-family: var(--nunito);
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #1F2C41;

  @media screen and (min-width: 1000px) {
    width: 750px;
    line-height: 40px;
    font-size: 24px;
    text-align: justify;
  }

  &:first-of-type {
    padding-bottom: 24px;

    @media screen and (min-width: 1000px) {
      padding-bottom: 50px;
    }
  }
}
</style>

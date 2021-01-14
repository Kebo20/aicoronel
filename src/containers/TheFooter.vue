<template>
  <CFooter :fixed="false">
    <div>
      <a href="https://gogazo.com" target="_blank">Gogazo</a>
      <span class="ml-1">&copy; {{new Date().getFullYear()}} Empresa de desarrollo de software</span>
    </div>
  
  </CFooter>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

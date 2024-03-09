<template>
  <SubjectCreate />
  <SubjectList />
</template>

<script>
// @ is an alias to /src
import SubjectCreate from '@/components/SubjectCreate.vue'
import SubjectList from '@/components/SubjectList.vue'

export default {
  name: 'HomeView',
  components: {
    SubjectCreate,
    SubjectList
  }
}
</script>

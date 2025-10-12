---
title: "À quoi ça ressemble ?"
layout: basic-title
transition: fade
mdc: true
---

::title::
🧑🏼‍💻 À quoi ça ressemble ?

::default::

<div class="pt-20">
  <div class="section-title text-[var(--theme-color-roofTerracotta)]">
    📥 useQuery - Récupération de données
  </div>

  <div class="code-container">

```tsx {all|1|3-7|9-10}{lines:true, class: '!children:p-10'}
import { useQuery } from '@tanstack/react-query'

const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetch('/api/users').then(res => res.json())
})

if (isLoading) return <div>Chargement...</div>
if (error) return <div>Erreur !</div>

return <div>{data?.map(user => user.name)}</div>
```

  </div>
</div>

<style scoped>
.section-title {
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  color: var(--theme-color-cloudBurst);
  margin-bottom: 1rem;
}

.code-container {
  text-align: left;
  padding-top: 1rem;
}
</style>

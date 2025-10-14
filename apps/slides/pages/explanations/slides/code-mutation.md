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
  📤 useMutation - Modification de données
  </div>

  <div class="code-container">

```tsx {all|3-9|12,14}{lines:true, class: '!children:p-10'}
import { useMutation, useQueryClient } from '@tanstack/react-query'

const mutation = useMutation({
  mutationKey: ['users'],
  mutationFn: (userData) => fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(userData)
  }),
  onSuccess: () => queryClient.invalidateQueries(['users'])
})

const handleCreate = () => mutation.mutate({ name: 'John' })

return <button onClick={handleCreate}>Créer utilisateur</button>
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

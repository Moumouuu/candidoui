<script lang="ts" setup>
import { CreditCard, LogOut, Settings, User } from 'lucide-vue-next'

import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

const props = defineProps<{
  user: User
}>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="rounded-full w-12 h-12 bg-accent flex items-center justify-center text-lg font-semibold text-black overflow-hidden uppercase"
        variant="ghost"
      >
        <span>{{ user?.first_name?.charAt(0) + user?.last_name?.charAt(0) }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>{{ user?.email }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <a href="/profile">Mon compte</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard class="mr-2 h-4 w-4" />
          <a href="/billing">Abonnement</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
          <a href="/settings">Paramètres</a>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut class="mr-2 h-4 w-4" />
        <a href="/logout">Se déconnecter</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

import { toast } from '~/components/ui/toast'

export class Toast {
  static success(payload: ToastDTO) {
    toast({
      title: payload.title || 'Succès',
      description: payload.description || 'Opération effectuée avec succès',
    })
  }

  static error(payload: ToastDTO) {
    toast({
      variant: 'destructive',
      title: payload.title || 'Erreur',
      description: payload.description || 'Une erreur est survenue',
    })
  }
}

interface ToastDTO {
  title: string
  description: string
}

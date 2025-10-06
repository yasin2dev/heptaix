import { AxiosError } from 'axios';
import { toast } from 'sonner';

type ToastOptions = {
  message: string;
  description: string;
  closeButton?: boolean;
  richColors?: boolean;
};

export class ToastMessages {
  error = (options: ToastOptions) => {
    toast.error(options.message, {
      closeButton: options.closeButton ?? true,
      richColors: options.richColors ?? true,
      description: options.description,
    });
  }
  
  success = (options: ToastOptions) => {
    toast.success(options.message, {
      closeButton: options.closeButton ?? true,
      richColors: options.richColors ?? true,
      description: options.description,
    });
  }
}
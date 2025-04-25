export const zodErrorMessages = { 
    email: 'Invalid email'
}

export const catchZodError = (error: any, message: string) => {
    error.issues.filter((issue: any) => {
        if (issue.message === message) {
            console.error(`Zod Type Error: ${message}`)
            return true;
        }
    })
    return false;
}
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function loginWithNumber(formData: FormData) {
  const supabase = await createClient()

  const data = {
    phone: formData.get('phone') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function loginWithEmail(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      data: {
        name: formData.get('name') as string,
        user: formData.get('user') as string,
        points: formData.get('points') as string,
        email_verified: true
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.error("signup error: ", error)
    redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}


export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  revalidatePath('/login', 'layout')
  redirect('/login')
}

export async function resetPasswordWithNumber(formData: FormData) {
  const supabase = await createClient()

  const data = {
    phone: formData.get('phone') as string
  }

  const { error } = await supabase.auth.signInWithOtp(data)

  if (error) {
    redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
  }
  
  revalidatePath('/forgot-password', 'layout')
  redirect('/forgot-password?message=success')
}

export async function resetPasswordWithEmail(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string
  }

  const { error } = await supabase.auth.resetPasswordForEmail(data.email)

  if (error) {
    redirect(`/forgot-password?message=${encodeURIComponent(error.message)}`)
  }
  
  revalidatePath('/forgot-password', 'layout')
  redirect('/forgot-password?message=success')
}
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    'https://wfqcgmcywnyvgoyisuiu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcWNnbWN5d255dmdveWlzdWl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg3MDUzNDgsImV4cCI6MjA5NDI4MTM0OH0.Jq509JlO43OVHlrp0RzQro95x_qSKDqt9aHHbJ77HhA'
  )
}
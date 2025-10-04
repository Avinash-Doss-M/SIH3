from django.contrib import admin
from .models import UserProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("email", "role", "supabase_id", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("email", "supabase_id", "first_name", "last_name")

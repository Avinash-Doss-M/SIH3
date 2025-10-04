from django.urls import path
from .views import (
    HealthCheckView, RegisterProfileView, CurrentUserView,
    StudentDashboardView, StudentApplicationsView, StudentRemindersView,
    MentorDashboardView, MentorFeedbackView,
    PlacementDashboardView, PlacementDrivesView,
)

urlpatterns = [
    path('health/', HealthCheckView.as_view(), name='health-check'),
    path('auth/register-profile/', RegisterProfileView.as_view(), name='register-profile'),
    path('auth/me/', CurrentUserView.as_view(), name='current-user'),
    path('student/dashboard/', StudentDashboardView.as_view(), name='student-dashboard'),
    path('student/applications/', StudentApplicationsView.as_view(), name='student-applications'),
    path('student/reminders/', StudentRemindersView.as_view(), name='student-reminders'),
    path('mentor/dashboard/', MentorDashboardView.as_view(), name='mentor-dashboard'),
    path('mentor/feedback/', MentorFeedbackView.as_view(), name='mentor-feedback'),
    path('placement/dashboard/', PlacementDashboardView.as_view(), name='placement-dashboard'),
    path('placement/drives/', PlacementDrivesView.as_view(), name='placement-drives'),
]

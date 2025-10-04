from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

# --- Placement Cell Dashboard ---
class PlacementDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # Debug log for all incoming headers
        import logging
        logger = logging.getLogger("django.request")
        logger.info("[PlacementDashboardView] Incoming headers: %s", dict(request.headers))
        stats = [
            {"label": "Active Students", "value": 320, "delta": "+12", "trend": "up"},
            {"label": "Placed", "value": 142, "delta": "+9", "trend": "up"},
            {"label": "Avg Package", "value": "6.2 LPA", "delta": "+0.4", "trend": "up"},
            {"label": "Upcoming Drives", "value": 5, "delta": "2 this week", "trend": "neutral"},
        ]
        return Response({"stats": stats})

class PlacementDrivesView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        drives = [
            {"company": "TechCorp", "date": "14 Feb", "stage": "Round 1"},
            {"company": "DataWorks", "date": "17 Feb", "stage": "Aptitude"},
            {"company": "CloudNova", "date": "21 Feb", "stage": "Registration"},
        ]
        return Response({"drives": drives})
# --- Mentor Dashboard ---
class MentorDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        stats = [
            {"label": "Assigned Students", "value": 18, "delta": "+3", "trend": "up"},
            {"label": "Active Sessions", "value": 5, "delta": "2 today", "trend": "neutral"},
            {"label": "Reviews Completed", "value": 42, "delta": "+6", "trend": "up"},
            {"label": "Avg Progress", "value": "74%", "delta": "+2%", "trend": "up"},
        ]
        return Response({"stats": stats})

class MentorFeedbackView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        feedback = [
            {"text": "Resume structure improved by 15% clarity score."},
            {"text": "Added ML project to portfolio enhancing visibility."},
            {"text": "Need to practice system design fundamentals."},
        ]
        return Response({"feedback": feedback})
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import UserProfile
from .serializers import UserProfileSerializer

class HealthCheckView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        return Response({
            "status": "ok",
            "service": "Campus Portal API",
        }, status=status.HTTP_200_OK)
class StudentDashboardView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # TODO: Replace with real queries
        stats = [
            {"label": "Applications", "value": 12, "delta": "+2 this week", "trend": "up"},
            {"label": "Interviews", "value": 4, "delta": "1 pending", "trend": "neutral"},
            {"label": "Offers", "value": 1, "delta": "Stable", "trend": "neutral"},
            {"label": "Profile Score", "value": "82%", "delta": "+5%", "trend": "up"},
        ]
        return Response({"stats": stats})

class StudentApplicationsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        # TODO: Replace with real queries
        applications = [
            {"id": 1, "role": "Frontend Intern", "status": "Pending", "statusColor": "#fbbf24", "company": "DevSoft", "updated": "2d"},
            {"id": 2, "role": "Data Analyst", "status": "Interview", "statusColor": "#34d399", "company": "InsightX", "updated": "4d"},
            {"id": 3, "role": "ML Engineer", "status": "Draft", "statusColor": "#94a3b8", "company": "NeuroEdge", "updated": "1w"},
        ]
        return Response({"applications": applications})

class StudentRemindersView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        reminders = [
            {"title": "Resume Update", "date": "Today"},
            {"title": "Portfolio Review", "date": "Fri"},
            {"title": "Mock Interview", "date": "Mon"},
        ]
        return Response({"reminders": reminders})


class RegisterProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data

        role = data.get("role")
        if role not in dict(UserProfile.ROLE_CHOICES):
            return Response({"detail": "Invalid role."}, status=status.HTTP_400_BAD_REQUEST)

        first_name = data.get("first_name", "")
        last_name = data.get("last_name", "")
        email = data.get("email") or getattr(user, "email", None)
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        profile, created = UserProfile.objects.update_or_create(
            supabase_id=user.id,
            defaults={
                "email": email,
                "role": role,
                "first_name": first_name,
                "last_name": last_name,
                "metadata": data.get("metadata"),
            },
        )

        serializer = UserProfileSerializer(profile)
        return Response(
            {
                "profile": serializer.data,
                "created": created,
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK,
        )


class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        profile = UserProfile.objects.filter(supabase_id=user.id).first()
        serializer = UserProfileSerializer(profile) if profile else None
        inferred_role = profile.role if profile else getattr(user, "role", None)
        return Response(
            {
                "supabase_id": user.id,
                "email": getattr(user, "email", None),
                "role": inferred_role,
                "profile": serializer.data if serializer else None,
            },
            status=status.HTTP_200_OK,
        )

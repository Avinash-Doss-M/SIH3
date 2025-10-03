import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { supabase } from "@lib/supabaseClient";
import { useAuth } from "@context/AuthContext";

const schema = yup.object({
  full_name: yup.string().required(),
  department: yup.string().required(),
  skills: yup.string().required("Comma separated skills"),
  bio: yup.string().nullable(),
  resumeFile: yup.mixed().nullable(),
  coverLetterFile: yup.mixed().nullable()
});

type FormValues = yup.InferType<typeof schema>;

const StudentProfileForm = () => {
  const { profile } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: profile?.full_name ?? "",
      department: profile?.department ?? "",
      skills: (profile?.skills ?? []).join(", ")
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!profile) return;
    // TODO: handle file upload to Supabase Storage bucket via signed URLs.
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: values.full_name,
        department: values.department,
        skills: values.skills.split(",").map((skill) => skill.trim())
      })
      .eq("id", profile.id);

    if (error) {
      console.error(error);
      return;
    }
    reset(values);
    // TODO: surface toast success message.
  };

  return (
    <form className="space-y-4 bg-white p-6 rounded shadow" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input className="mt-1 w-full rounded border px-3 py-2" {...register("full_name")} />
        {errors.full_name && <p className="text-xs text-red-500">{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <input className="mt-1 w-full rounded border px-3 py-2" {...register("department")} />
        {errors.department && <p className="text-xs text-red-500">{errors.department.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        <input className="mt-1 w-full rounded border px-3 py-2" {...register("skills")} />
        {errors.skills && <p className="text-xs text-red-500">{errors.skills.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Resume (PDF)</label>
          <input type="file" accept="application/pdf" {...register("resumeFile")} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cover Letter (PDF)</label>
          <input type="file" accept="application/pdf" {...register("coverLetterFile")} />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
};

export default StudentProfileForm;

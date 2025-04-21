export interface IInstructorRequest {
    _id: string;
    description: string;
    status: "pending" | "approved" | "rejected";
    feedback?: string;
    createdAt: string;
    userId: {
      _id: string;
      email: string;
      username: string;
      role: string;
      status: string;
    };
  }
  
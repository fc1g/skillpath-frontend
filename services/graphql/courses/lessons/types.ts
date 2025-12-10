export type LessonsStaticParams = {
	id: string;
	courseId: string;
}[];

export type LessonMetadata = {
	title: string;
	order: number;
	durationSeconds: number;
};

export type UpdateLessonProgressInput = {
	status: string;
	lessonId: string;
	courseId: string;
};

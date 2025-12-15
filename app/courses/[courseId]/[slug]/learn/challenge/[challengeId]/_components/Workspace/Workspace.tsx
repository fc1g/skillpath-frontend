import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import ResultsPanel from './ResultsPanel';
import { Challenge } from '@/types/courses';
import CodeEditorWrapper from './CodeEditorWrapper';

type WorkspaceProps = {
	challenge: Challenge;
};

export default function Workspace({ challenge }: WorkspaceProps) {
	return (
		<Tabs defaultValue="editor">
			<TabsList>
				<TabsTrigger value="editor">Code Editor</TabsTrigger>
				<TabsTrigger value="results">Results</TabsTrigger>
			</TabsList>
			<TabsContent value="editor" className="h-full w-full">
				<CodeEditorWrapper challenge={challenge} />
			</TabsContent>
			<TabsContent value="results" className="h-full w-full">
				<ResultsPanel />
			</TabsContent>
		</Tabs>
	);
}

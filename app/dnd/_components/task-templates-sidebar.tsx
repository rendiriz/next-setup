'use client';

import { TaskTemplate } from './task-template';

const templates = [
  {
    id: 'template-basic',
    title: 'Basic Task',
    description: 'A simple task with title only',
  },
  {
    id: 'template-detailed',
    title: 'Detailed Task',
    description: 'A task with title and detailed description',
  },
  {
    id: 'template-bug',
    title: 'Bug Report',
    description: 'Track and fix software issues',
  },
  {
    id: 'template-feature',
    title: 'Feature Request',
    description: 'New feature implementation task',
  },
];

export function TaskTemplatesSidebar() {
  return (
    <div className="w-72 border-r border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-gray-900 dark:text-gray-100">Task Templates</h2>
      <div className="space-y-3">
        {templates.map((template) => (
          <TaskTemplate
            key={template.id}
            id={template.id}
            title={template.title}
            description={template.description}
          />
        ))}
      </div>
    </div>
  );
}

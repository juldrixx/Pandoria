export default {
  type: 'object',
  properties: {
    lineages: {
      type: 'array',
      items: {
        properties: {
          data_source: {
            type: 'object',
            properties: {
              data_source_id: { type: 'string' },
              name: { type: 'string' },
              webpage_url: { type: 'string' },
              connection_hostname: { type: 'string' },
              connection_type: { type: 'string' },
              tables: {
                type: 'array',
                items: { type: 'string' },
              },
              sql_queries: {
                type: 'array',
                items: { type: 'string' },
              },
            },
            required: [
              'data_source_id',
              'name',
              'webpage_url',
              'connection_hostname',
              'connection_type',
              'tables',
              'sql_queries',
            ],
          },
          refreshes_history: {
            type: 'array',
            items: {
              properties: {
                id: { type: 'string' },
                revision: { type: 'integer' },
                data_source_id: { type: 'string' },
                notify_start_date: { type: 'string' },
                refresh_start_date: { type: 'string' },
                refresh_end_date: { type: 'string' },
                refresh_state: { type: 'string' },
                refresh_trigger_id: { type: 'string' },
                run_url: { type: 'string', format: 'url' },
                tables: {
                  type: 'object',
                  patternProperties: {
                    '.+': {
                      type: 'object',
                      properties: {
                        unique_refresh_id: { type: 'string' },
                        table: {
                          type: 'object',
                          properties: {
                            schema: { type: 'string' },
                            name: { type: 'string' },
                          },
                          required: ['schema', 'name'],
                        },
                        refresh_state: { type: 'string' },
                        updated_at: { type: 'string' },
                        dag_id: { type: 'string' },
                        task_id: { type: 'string' },
                        run_id: { type: 'string' },
                        run_url: { type: 'string', format: 'url' },
                      },
                      required: [
                        'unique_refresh_id',
                        'table',
                        'refresh_state',
                        'updated_at',
                        'dag_id',
                        'task_id',
                        'run_id',
                        'run_url',
                      ],
                    },
                  },
                },
              },
              required: [
                'id',
                'revision',
                'data_source_id',
                'notify_start_date',
                'refresh_start_date',
                'refresh_end_date',
                'refresh_state',
                'refresh_trigger_id',
                'run_url',
                'tables',
              ],
            },
          },
        },
        required: ['data_source', 'refreshes_history'],
      },
    },
  },
  required: ['lineages'],
};

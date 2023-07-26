import React from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { AddBox, ArrowDownward, Check, ChevronLeft, ChevronRight, Clear, DeleteOutline, Edit, FilterList, FirstPage, LastPage, Remove, SaveAlt, Search, ViewColumn } from '@mui/icons-material';

const DataTable = ({ columns, data, title, actions }) => {
  const defaultMaterialTheme = createTheme({
    overrides: {
      MuiToolbar: {
        root: {
          backgroundColor: '#f0f2f5',
        },
      },
    },
  });

  const tableIcons = {
    Add: AddBox,
    Check: Check,
    Clear: Clear,
    Delete: DeleteOutline,
    DetailPanel: ChevronRight,
    Edit: Edit,
    Export: SaveAlt,
    Filter: FilterList,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    ResetSearch: Clear,
    Search: Search,
    SortArrow: ArrowDownward,
    ThirdStateCheck: Remove,
    ViewColumn: ViewColumn,
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable
        columns={columns}
        data={data}
        title={title}
        actions={actions}
        icons={tableIcons}
        options={{
          headerStyle: {
            backgroundColor: '#f0f2f5',
            color: '#333',
            fontWeight: 'bold',
          },
          rowStyle: {
            backgroundColor: '#fff',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          },
          paging: true,
          pageSize: 10,
          pageSizeOptions: [10, 20, 50],
          actionsColumnIndex: -1,
          toolbarButtonAlignment: 'left',
          showFirstLastPageButtons: false,
          searchFieldStyle: {
            color: '#333',
            fontWeight: 'bold',
          },
          emptyDataSourceMessage: 'No data to display',
          loadingType: 'linear',
          draggable: true, // Allow columns to be draggable for reordering
          searchAutoFocus: true, // Autofocus the search field on table load
          showToolbar: true, // Show the table toolbar with search and export options
          headerSelectionProps: {
            // Select all checkbox header customization
            color: 'primary',
          },
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'No records to display',
            deleteTooltip: 'Delete',
            editTooltip: 'Edit',
            editRow: {
              deleteText: 'Are you sure you want to delete this record?',
            },
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} of {count}',
            labelRowsSelect: 'rows per page',
            labelRowsPerPage: 'Rows per page:',
            firstAriaLabel: 'First Page',
            firstTooltip: 'First Page',
            previousAriaLabel: 'Previous Page',
            previousTooltip: 'Previous Page',
            nextAriaLabel: 'Next Page',
            nextTooltip: 'Next Page',
            lastAriaLabel: 'Last Page',
            lastTooltip: 'Last Page',
          },
          toolbar: {
            searchTooltip: 'Search',
            searchPlaceholder: 'Search',
            exportTitle: 'Export',
            exportAriaLabel: 'Export',
            exportName: 'Export as CSV',
            searchResetAriaLabel: 'Clear Search',
            searchResetTooltip: 'Clear Search',
            searchCloseAriaLabel: 'Close Search',
            searchCloseTooltip: 'Close Search',
          },
        }}
      />
    </ThemeProvider>
  );
};

export default DataTable;

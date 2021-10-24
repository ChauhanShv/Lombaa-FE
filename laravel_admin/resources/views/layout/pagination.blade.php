<nav aria-label="...">
  <ul class="pagination">
    <li class="page-item {{ $pagination['currentPage'] <= 1 ? 'disabled' : '' }}">
      <a class="page-link" href="{{ request()->fullUrlWithQuery(['page' => $pagination['currentPage'] -1]) }}" tabindex="-1">Previous</a>
    </li>
    @for ($i = 1; $i <= $pagination['pageCount']; $i++)
        <li class="page-item {{ $pagination['currentPage'] == $i ? 'active' : '' }}">
            <a class="page-link" href="{{ request()->fullUrlWithQuery(['page' => $i]) }}">{{$i}}</a>
        </li>
    @endfor
    <li class="page-item {{ $pagination['currentPage'] >= $pagination['pageCount'] ? 'disabled' : '' }}">
      <a class="page-link" href="{{ request()->fullUrlWithQuery(['page' => $pagination['currentPage'] + 1]) }}">Next</a>
    </li>
  </ul>
</nav>